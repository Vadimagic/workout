import express from 'express'

import { protect } from '../middleware/auth.middleware.js'

import {
	createWorkoutLog,
	getWorkoutLog,
	updateWorkoutLog
} from './log/workout-log.controller.js'
import {
	createNewWorkout,
	deleteWorkout,
	getWorkout,
	getWorkouts,
	updateWorkout
} from './workout.controller.js'

const router = express.Router()

router.route('/').post(protect, createNewWorkout)
router.route('/').get(protect, getWorkouts)
router.route('/:id').get(protect, getWorkout)
router.route('/:id').delete(protect, deleteWorkout)
router.route('/:id').put(protect, updateWorkout)

router.route('/log/:workoutId').post(protect, createWorkoutLog)
router.route('/log/:id').get(protect, getWorkoutLog)
router.route('/log/complete/:id').patch(protect, updateWorkoutLog)

export default router
