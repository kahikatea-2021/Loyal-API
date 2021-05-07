const admin = require('firebase-admin')

function createUser({email, password, userName, firstName, lastName, phone}) {
	
	const customClaim = {
		firstName: firstName,
		lastName: lastName,
		phoneNumber: phone
	}

	return admin.auth().createUser({
		email: email,
		password: password,
		displayName: userName,
        
	}).then( userRecord => {
		return admin.auth().createCustomToken(userRecord.uid, customClaim)
	}).then( token => {
		console.log(token)
		/*admin.auth().getUser(userId).then( userRecord => {
			console.log(userRecord.customClaims)
		})*/
		return token
	})

    


}

module.exports = {
	createUser
}