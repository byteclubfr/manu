const fs = require('mz/fs')
const request = require('request')
const mkdirp = require('mkdirp')
const { JSON_PATH } = require('./config')

// download JSON
const fetch = (doc) => {
	const req = request
		.get(`http://docs.devdocs.io/${doc}/db.json?${Date.now()}`)
		.on('response', () => console.log(`${doc}.json downloading…`))
		.on('error', (err) => console.error(err))
		.on('end', () => console.log(`${doc}.json downloaded in ${JSON_PATH}`))
	req.pipe(fs.createWriteStream(`${JSON_PATH}/${doc}.json`))
	req.doc = doc
	return req
}

module.exports = (docs) =>
	new Promise((resolve, reject) =>
		mkdirp(JSON_PATH, (err) =>
			err ? reject(err) : resolve(docs.map(fetch))
		)
	)
