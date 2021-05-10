const cloudinary = require('.')

function storeImage(content) {
	if (content) {
		return cloudinary.v2.uploader.upload(content, {
			overwrite: true,
            
		})
	} 

	throw new Error('Must have the content')
}

module.exports = {
	storeImage
}