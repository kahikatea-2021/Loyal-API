const admin = require('firebase-admin')

const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS

function initialize() {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
		databaseURL: 'https://coffee-loyalty-app-312823-default-rtdb.firebaseio.com',
	})
}

module.exports = {
	initialize,
	storage: admin.storage,
	auth: admin.auth
}