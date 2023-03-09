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
	const exercises = await prisma.exercise.findMany()
	res.json(exercises)
})

/*
	@desc 		Delete exercise
	@route 		DELETE /api/exercises
	@access 	private
*/
export const deleteExercise = asyncHandler(async (req, res) => {
	const id = Number(req.params.id)
	const deleteExercise = await prisma.exercise.delete({
		where: {
			id
		}
	})
	console.log('deleteExercise', deleteExercise)
	if (deleteExercise) {
		res.json(deleteExercise)
	} else {
		res.status(400)
		throw new Error('Can not delete')
	}
})

/*
	@desc 		Update exercise
	@route 		PUT /api/exercises
	@access 	private
*/
export const updateExercise = asyncHandler(async (req, res) => {
	const id = Number(req.params.id)
	const updatedExercise = await prisma.exercise.update({
		where: {
			id
		},
		data: req.body
	})
	res.json(updatedExercise)
})
