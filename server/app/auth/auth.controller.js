import { faker } from '@faker-js/faker'
import { hash, verify } from 'argon2'
import asyncHandler from 'express-async-handler'

import { prisma } from '../prisma.js'
import { UserFields } from '../utils/users.utils.js'

import { generateToken } from './generate-token.js'

/*
	@desc 		Auth user
	@route 		POST /api/users/login
	@access 	public
*/
export const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body
	const user = await prisma.user.findUnique({
		where: { email }
	})

	if (!user) {
		res.status(400)
		throw new Error('User not found')
	}

	const isVerifyPassword = await verify(user.password, password)

	if (!isVerifyPassword) {
		res.status(400)
		throw new Error('Incorrect email or password')
	}

	const token = generateToken(user.id)

	res.json({ token })
})

/*
	@desc 		Register user
	@route 		POST /api/users/register
	@access 	public
*/
export const registerUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const isHaveUser = await prisma.user.findUnique({
		where: { email }
	})

	if (isHaveUser) {
		res.status(400)
		throw new Error('User already exists')
	}

	const user = await prisma.user.create({
		data: {
			email,
			password: await hash(password),
			name: faker.name.fullName()
		},
		select: UserFields
	})

	const token = generateToken(user.id)

	res.json({ user, token })
})
