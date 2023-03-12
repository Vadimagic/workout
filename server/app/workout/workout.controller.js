import asyncHandler from 'express-async-handler'

import { prisma } from '../prisma.js'

import { calculateMinute } from './calculate-minute.js'

/*
	@desc 		Create workout
	@route 		POST /api/workouts
	@access 	private
*/
export const createNewWorkout = asyncHandler(async (req, res) => {
	const { name, exerciseIds } = req.body

	const workout = await prisma.workout.create({
		data: {
			name,
			exercises: {
				connect: exerciseIds.map(id => ({ id }))
			}
		}
	})

	res.json(workout)
})

/*
	@desc 		Get workouts
	@route 		GET /api/workouts
	@access 	private
*/
export const getWorkouts = asyncHandler(async (req, res) => {
	const workouts = await prisma.workout.findMany({
		orderBy: {
			createdAt: 'desc'
		},
		include: {
			exercises: true
		}
	})
	res.json(workouts)
})

/*
	@desc 		Get workout
	@route 		GET /api/workouts/:id
	@access 	private
*/
export const getWorkout = asyncHandler(async (req, res) => {
	const id = Number(req.params.id)
	const workout = await prisma.workout.findUnique({
		where: { id },
		include: {
			exercises: true,
			workoutLogs: true
		}
	})

	if (!workout) {
		res.status(404)
		res.json({
			message: 'Workout not found'
		})
	}

	const minutes = calculateMinute(workout.exercises.length)

	res.json({ ...workout, minutes })
})

/*
	@desc 		Delete workout
	@route 		DELETE /api/workouts/:id
	@access 	private
*/
export const deleteWorkout = asyncHandler(async (req, res) => {
	const id = Number(req.params.id)
	try {
		await prisma.workout.delete({
			where: {
				id
			}
		})
		res.json({ message: 'Workout deleted' })
	} catch (error) {
		res.status(404)
		throw new Error('Workout not found')
	}
})

/*
	@desc 		Update workout
	@route 		PUT /api/workouts/:id
	@access 	private
*/
export const updateWorkout = asyncHandler(async (req, res) => {
	const { name, exerciseIds } = req.body
	try {
		const updatedWorkout = await prisma.workout.update({
			where: {
				id: Number(req.params.id)
			},
			data: {
				name,
				exercises: {
					set: exerciseIds.map(id => ({ id }))
				}
			}
		})
		res.json(updatedWorkout)
	} catch (error) {
		res.status(404)
		throw new Error('Workout not found')
	}
})
