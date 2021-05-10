const { storage } = require('../auth')
const BUCKET_NAME = 'store-images'

function storeImage(content) {
	return new Promise( (resolve, reject) => {
		if (content) {

			const ref = storage().bucket(BUCKET_NAME)
			ref.upload('gs://loyal-cbd69.appspot.com', (err, file, res) => {
				resolve(console.log(file.publicUrl))
			})

		} 

		reject('Must have the content')
	})
}

module.exports = {
	storeImage
}