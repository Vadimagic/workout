import asyncHandler from 'express-async-handler'

/*
	@desc 		Get user profile user
	@route 		GET /api/user/profile
	@access 	private
*/
export const getUserProfile = asyncHandler(async (req, res) => {
	res.json({ user: req.user })
})
