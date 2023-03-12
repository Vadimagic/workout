import express from 'express'

import { protect } from '../middleware/auth.middleware.js'

import { getStatistic, getUserProfile } from './user.controller.js'

const router = express.Router()

router.route('/profile').get(protect, getUserProfile)
router.route('/statistic').get(protect, getStatistic)

export default router
