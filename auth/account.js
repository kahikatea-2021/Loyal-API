const admin = require('firebase-admin')
const { auth } = admin

function createUser({email, password, userName, firstName, lastName, phone}) {
	
	const customClaim = {
		userName: userName,
		firstName: firstName,
		lastName: lastName,
		phoneNumber: phone,
	}

	return auth().createUser({
		email: email,
		password: password,
        
	}).then( userRecord => {
		return auth().createCustomToken(userRecord.uid, customClaim)
	})

}

module.exports = {
	createUser
}