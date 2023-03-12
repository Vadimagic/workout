import asyncHandler from 'express-async-handler'

import { prisma } from '../../prisma.js'

import { addPrevValues } from './add-prev-values.utils.js'

/*
	@desc 		Create exerciseLog
	@route 		POST /api/exercises/log/:id
	@access 	private
*/
export const createNewExerciseLog = asyncHandler(async (req, res) => {
	const exerciseId = Number(req.params.exerciseId)

	const exercise = await prisma.exercise.findUnique({
		where: {
			id: exerciseId
		}
	})

	if (!exercise) {
		res.status(404)
		throw new Error('Exercise not found')
	}

	const timesDefault = []

	for (let i = 0; i < exercise.times; i++) {
		timesDefault.push({
			weight: 0,
			reps: 0
		})
	}

	const exerciseLog = await prisma.exerciseLog.create({
		data: {
			user: {
				connect: {
					id: req.user.id
				}
			},
			exercise: {
				connect: {
					id: exerciseId
				}
			},
			times: {
				createMany: {
					data: timesDefault
				}
			}
		},
		include: {
			times: true
		}
	})

	res.json(exerciseLog)
})

/*
	@desc 		Get exerciseLog
	@route 		GET /api/exercises/log/:id
	@access 	private
*/
export const getExerciseLog = asyncHandler(async (req, res) => {
	const exerciseLogId = Number(req.params.exerciseLogId)

	const exerciseLog = await prisma.exerciseLog.findUnique({
		where: {
			id: exerciseLogId
		},
		include: {
			exercise: true,
			times: {
				orderBy: {
					id: 'asc'
				}
			}
		}
	})

	if (!exerciseLog) {
		res.status(404)
		throw new Error('Exercise log not found')
	}

	const prevExerciseLog = await prisma.exerciseLog.findFirst({
		where: {
			exerciseId: exerciseLog.exerciseId,
			userId: req.user.id,
			isCompleted: true
		},
		orderBy: {
			createdAt: 'desc'
		},
		include: {
			exercise: true,
			times: {
				orderBy: {
					id: 'asc'
				}
			}
		}
	})

	// TODO change second params to prevExerciseLog
	res.json({
		...exerciseLog,
		times: addPrevValues(exerciseLog, null)
	})
})

/*
	@desc 		Complete completeExerciseLogTime
	@route 		PUT /api/exercises/log/complete/:exerciseLogTimeId
	@access 	private
*/
export const updateExerciseLogTime = asyncHandler(async (req, res) => {
	const exerciseLogTimeId = Number(req.params.exerciseLogTimeId)
	const { weight, reps, isCompleted } = req.body

	try {
		const exerciseLogTime = await prisma.exerciseTime.update({
			where: {
				id: exerciseLogTimeId
			},
			data: {
				weight,
				reps,
				isCompleted
			}
		})

		res.json(exerciseLogTime)
	} catch (error) {
		res.status(404)
		throw new Error('Exercise time not found')
	}
})

/*
	@desc 		Complete exerciseLog
	@route 		PATCH /api/exercises/log/complete/:id
	@access 	private
*/
export const completeExerciseLog = asyncHandler(async (req, res) => {
	const exerciseLogId = Number(req.params.exerciseLogId)
	const { isCompleted } = req.body

	try {
		const exerciseLog = await prisma.exerciseLog.update({
			where: {
				id: exerciseLogId
			},
			data: {
				isCompleted
			},
			include: {
				exercise: true
			}
		})

		res.json(exerciseLog)
	} catch (error) {
		res.status(404)
		throw new Error('Exercise log not found')
	}
})
