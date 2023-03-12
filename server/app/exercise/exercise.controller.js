import asyncHandler from 'express-async-handler'

import { prisma } from '../prisma.js'

/*
	@desc 		Create exercise
	@route 		POST /api/exercises
	@access 	private
*/
export const createNewExercise = asyncHandler(async (req, res) => {
	const { name, times, iconPath } = req.body

	const exercise = await prisma.exercise.create({
		data: { name, times, iconPath }
	})

	res.json(exercise)
})

/*
	@desc 		Get exercises
	@route 		GET /api/exercises
	@access 	private
*/
export const getExercises = asyncHandler(async (req, res) => {
	const exercises = await prisma.exercise.findMany({
		orderBy: {
			createdAt: 'desc'
		}
	})
	res.json(exercises)
})

/*
	@desc 		Delete exercise
	@route 		DELETE /api/exercises/:id
	@access 	private
*/
export const deleteExercise = asyncHandler(async (req, res) => {
	const id = Number(req.params.id)
	try {
		await prisma.exercise.delete({
			where: {
				id
			}
		})
		res.json({ message: 'Exercise deleted' })
	} catch (error) {
		res.status(404)
		throw new Error('Exercise not found')
	}
})

/*
	@desc 		Update exercise
	@route 		PUT /api/exercises/:id
	@access 	private
*/
export const updateExercise = asyncHandler(async (req, res) => {
	const { name, times, iconPath } = req.body
	const id = Number(req.params.id)
	try {
		const updatedExercise = await prisma.exercise.update({
			where: {
				id
			},
			data: {
				name,
				times,
				iconPath
			}
		})
		res.json(updatedExercise)
	} catch (error) {
		res.status(404)
		throw new Error('Exercise not found')
	}
})
