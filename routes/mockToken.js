const jwt = require('jsonwebtoken')
const credentials = require('../service-account-crendentials.json')
function getMockToken(userId, data) {
	const token = jwt.sign(data, credentials.private_key, {
		issuer: 'https://securetoken.google.com/' + credentials.project_id,
		audience: credentials.project_id,
		algorithm: 'RS256',
		expiresIn: '1h',
		subject: userId,
		keyid: '536daeabf8dd65d4de21e824b899a1f3da2f8958'
	})

	console.log(token)

	return token
}

module.exports = {
	getMockToken
}