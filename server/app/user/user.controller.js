import asyncHandler from 'express-async-handler'

import { prisma } from '../prisma.js'
import { calculateMinute } from '../workout/calculate-minute.js'

/*
	@desc 		Get user profile user
	@route 		GET /api/user/profile
	@access 	private
*/
export const getUserProfile = asyncHandler(async (req, res) => {
	const countExerciseTimesComplete = await prisma.exerciseLog.count({
		where: {
			userId: req.user.id,
			isCompleted: true
		}
	})

	const kgs = await prisma.exerciseTime.aggregate({
		where: {
			exerciseLog: {
				userId: req.user.id
			},
			isCompleted: true
		},
		_sum: {
			weight: true
		}
	})

	const workouts = await prisma.exerciseLog.count({
		where: {
			userId: req.user.id
		}
	})

	res.json({
		user: req.user,
		statistics: [
			{
				label: 'minutes',
				value: calculateMinute(countExerciseTimesComplete) || 0
			},
			{
				label: 'kgs',
				value: kgs._sum.weight || 0
			},
			{
				label: 'workouts',
				value: workouts
			}
		]
	})
})
