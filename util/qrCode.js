
const QRCode = require('qrcode')

function generateQRCode(data) {
	return new Promise( (resolve, reject) => {
		QRCode.toDataURL(data, {}, (err, url) => {
			if (!err) {
				resolve(url)
			} else {
				reject(err)
			}
		})
	})
}

module.exports = {
	generateQRCode
}
