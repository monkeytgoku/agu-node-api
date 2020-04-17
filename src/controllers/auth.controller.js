const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const configs = require('../configs');
const appConfig = require('../configs/app.config');
const bcrypt = require('bcrypt');

const authController = {};

authController.login = function (req, res) {
	User.findOne(
		{ user_name: req.body.user_name },
		function (err, user) {
			if (err) {
				return res.status(500).json({
					error: err
				});
			}
			if (!user) {
				return res.status(400).json({ message: 'UserName or password is wrong!' })
			}
			bcrypt.compare(req.body.password, user.password, async (err, result) => {
				if (err) {
					return res.status(400).json({
						message: 'UserName or password is wrong!'
					});
				}
				if (result) {
					const token = user.generateToken();
					await user.save();
					// A Cookie can be marked as Secure, meaning that the browser will only append the cookie to the request
					// if it's being made over an HTTPS connection
					// Cookie can also be marked as Http Only, meaning that it's not accessible by the Javascript code at all
					res.cookie("SESSION_ID", token, { maxAge: appConfig.cookieLifeTime*1000, httpOnly: true, secure: false });
					return res.status(200).json({
						message: 'Login success!',
						user: user.getInfoNoPassword(),
						token: token,
						expiresIn: appConfig.tokenLifeTime
					})
				}
				return res.status(400).json({
					message: 'UserName or password is wrong!'
				});
			})
		})
}

authController.logout = async function (req, res) {
	// >>> Using JWT

	// Log user out of the application
	// try {
	//     req.user.tokens = req.user.tokens.filter((token) => {
	//         return token.token != req.token;
	//     })
	//     await req.user.save();
	//     return res.status(200).json({ 'message': "Logout success!" });
	// } catch (err) {
	//     return res.status(500).json({ error: err });
	// }

	// Log user out of all devices	
	try {
		res.clearCookie("SESSION_ID");
		req.user.tokens.splice(0, req.user.tokens.length);
		await req.user.save();
		return res.status(200).json({ 'message': "Logout success!" });
	} catch (err) {
		return res.status(500).json({ error: err });
	}
}

authController.refresh = function (req, res) {
	var token = req.cookies.SESSION_ID || '';
	if (token) {
		jwt.verify(token, configs.secret.SESSION_SECRET, async function (err, decoded) {
			if (err) {
				return res.status(500).json({ message: 'Failed to authenticate token!' });
			} else {
				const user = await User.findOne({ _id: decoded.user._id, 'tokens.token': token });
				if (!user) {
					return res.status(400).json({ message: 'Please login again!' });
				}
				const newToken = user.generateToken();
				await user.save();
				// A Cookie can be marked as Secure, meaning that the browser will only append the cookie to the request
				// if it's being made over an HTTPS connection
				// Cookie can also be marked as Http Only, meaning that it's not accessible by the Javascript code at all
				res.cookie("SESSION_ID", newToken, { httpOnly: true, secure: false });
				return res.status(200).json({
					message: 'Refresh token success!',
					user: user.getInfoNoPassword(),
					token: newToken,
					expiresIn: appConfig.tokenLifeTime
				})
			}
		});
	} else {
		return res.status(400).json({ message: 'Please login again!' });
	}
}

module.exports = authController;