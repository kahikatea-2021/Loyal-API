const { auth } = require('./')

function verifyUser(claim) {

	return (req, res, next) => {
		const authorizationHeader = req.headers.authorization
		if (authorizationHeader) {
			const token = authorizationHeader.split(' ')[1]
        
			auth().verifyIdToken(token).then( decodedToken => {
				auth().getUser(decodedToken.uid).then( userData => {
					if (claim.shop === userData.customClaims.shop) {
						
					}
					req.user = decodedToken
					next()
				})
			}).catch( () => {
				res.status(500).json({
					error: {
						title: 'Unauthorized'
					}
				})
			})

		} else {
			res.status(401).json({
				error: {
					title: 'Unauthorized'
				}
			})
		}
 
	}
}

module.exports = {
	verifyUser
}