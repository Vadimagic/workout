import express from 'express'

import { protect } from '../middleware/auth.middleware.js'

import {
	createNewExercise,
	deleteExercise,
	getExercises,
	updateExercise
} from './exercise.controller.js'
import {
	completeExerciseLog,
	createNewExerciseLog,
	getExerciseLog,
	updateExerciseLogTime
} from './log/exercise-log.controller.js'

const router = express.Router()

router.route('/').post(protect, createNewExercise)
router.route('/').get(protect, getExercises)
router.route('/:id').delete(protect, deleteExercise)
router.route('/:id').put(protect, updateExercise)
router.route('/log/:exerciseId').post(protect, createNewExerciseLog)
router.route('/log/:exerciseLogId').get(protect, getExerciseLog)
router.route('/log/complete/:exerciseLogId').patch(protect, completeExerciseLog)
router.route('/log/time/:exerciseLogTimeId').put(protect, updateExerciseLogTime)

export default router
