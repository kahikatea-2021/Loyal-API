const cloudinary = require('.')

function storeImage(content) {
	if (content) {
		return cloudinary.v2.uploader.upload(content, {
			overwrite: true,
            
		})
	} 
	return Promise.resolve({
		url: null
	})
	//throw new Error('Must have the content')
}

module.exports = {
	storeImage
}