import express from 'express'

import { protect } from '../middleware/auth.middleware.js'

import {
	createNewExercise,
	deleteExercise,
	getExercises,
	updateExercise
} from './exercise.controller.js'

const router = express.Router()

router.route('/').post(protect, createNewExercise)
router.route('/').get(protect, getExercises)
router.route('/:id').delete(protect, deleteExercise)
router.route('/:id').put(protect, updateExercise)

export default router
