const fs = require('fs')
const request = require('request')
const mkdirp = require('mkdirp')
const homeDir = require('home-dir')

const JSON_PATH = homeDir('.manu-pages/json')

module.exports = (docs) => {
	mkdirp(JSON_PATH, (err) => {
		if (err) throw err

		docs.forEach((doc) => {
			request
				.get(`http://docs.devdocs.io/${doc}/db.json?${Date.now()}`)
				.on('error', (err) => console.log(err))
				.on('end', () => console.log(`${doc}.json downloaded in ${JSON_PATH}`))
				.pipe(fs.createWriteStream(`${JSON_PATH}/${doc}.json`))
		})
	})
}
