import asyncHandler from 'express-async-handler'

import { prisma } from '../../prisma.js'
import { calculateMinute } from '../calculate-minute.js'

/*
	@desc 		Create workoutLog
	@route 		POST /api/workouts/log/:workoutId
	@access 	private
*/
export const createWorkoutLog = asyncHandler(async (req, res) => {
	const workout = await prisma.workout.findUnique({
		where: {
			id: +req.params.workoutId
		},
		include: {
			exercises: true
		}
	})

	if (!workout) {
		res.status(404)
		throw new Error('Not found workout log')
	}

	const workoutLog = await prisma.workoutLog.create({
		data: {
			workout: {
				connect: {
					id: +req.params.workoutId
				}
			},
			user: {
				connect: {
					id: req.user.id
				}
			},
			exerciseLogs: {
				create: workout.exercises.map(exercise => ({
					user: {
						connect: {
							id: req.user.id
						}
					},
					exercise: {
						connect: {
							id: exercise.id
						}
					},
					times: {
						create: Array.from({ length: exercise.times }, () => ({
							weight: 0,
							reps: 0
						}))
					}
				}))
			}
		},
		include: {
			workout: true,
			exerciseLogs: {
				include: {
					times: true
				}
			}
		}
	})

	res.json(workoutLog)
})

/*
	@desc 		Get workoutLog
	@route 		GET /api/workouts/log/:id
	@access 	private
*/
export const getWorkoutLog = asyncHandler(async (req, res) => {
	const workoutLog = await prisma.workoutLog.findUnique({
		where: {
			id: +req.params.id
		},
		include: {
			workout: {
				include: {
					exercises: true
				}
			},
			exerciseLogs: {
				orderBy: {
					id: 'asc'
				},
				include: {
					exercise: true
				}
			}
		}
	})

	if (!workoutLog) {
		res.status(404)
		throw new Error('Not found workout')
	}

	const minutes = calculateMinute(workoutLog.workout.exercises.length)

	res.json({
		...workoutLog,
		minutes
	})
})

/*
	@desc 		Update workoutLog
	@route 		PATCH /api/workouts/log/complete/:id
	@access 	private
*/
export const updateWorkoutLog = asyncHandler(async (req, res) => {
	try {
		const workoutLog = await prisma.workoutLog.update({
			where: {
				id: +req.params.id
			},
			data: {
				isCompleted: true
			}
		})

		res.json(workoutLog)
	} catch (error) {
		res.status(404)
		throw new Error('Not found workout log')
	}
})
