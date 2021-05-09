const {auth} = require('../auth')

function createUser(isStore, {email, password, firstName, lastName, phone}) {

	return auth().createUser({
		email: email,
		password: password,
		displayName: `${firstName} ${lastName}`,
		//phoneNumber: phone
	}).then( userRecord => {
		return auth().setCustomUserClaims( userRecord.uid, {
			shop: isStore
		})
	})

}

module.exports = {
	createUser
}