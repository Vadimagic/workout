// @desc 		Auth user
// @route 	POST /api/users/login
// @access 	public
export const authUser = (req, res) => {
	res.json({
		message: 'You are authenticated'
	})
}
