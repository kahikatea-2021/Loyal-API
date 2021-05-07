const admin = require('firebase-admin')

const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://coffee-loyalty-app-312823-default-rtdb.firebaseio.com'
})

module.exports = admin