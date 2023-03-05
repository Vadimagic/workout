import 'colors'
import * as dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'

import { errorHandler, notFound } from './app/middleware/error.middleware.js'

import authRoutes from './app/auth/auth.routes.js'
import { prisma } from './app/prisma.js'

/*
	TODO:
	[] - Async error handling for method
	[] - App.use notFound, errorHandler
*/

dotenv.config()

const app = express()

async function main() {
	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'))
	}
	app.use(express.json())
	app.use('/api/auth', authRoutes)

	// middleware
	app.use(notFound)
	app.use(errorHandler)

	const PORT = process.env.PORT || 5000
	app.listen(
		PORT,
		console.log(
			`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green
				.bold
		)
	)
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect
		process.exit()
	})
