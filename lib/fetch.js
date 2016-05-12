const fs = require('mz/fs')
const request = require('request')
const mkdirp = require('mkdirp')
const { JSON_PATH } = require('./config')
const { dashToTilde } = require('./util')

// get the list of all docs (ls -a) or a specific one
const getURL = (doc) =>
	doc === 'docs'
		? `http://devdocs.io/docs.json?${Date.now()}`
		: `http://docs.devdocs.io/${dashToTilde(doc)}/db.json?${Date.now()}`


// download JSON
const fetch = exports.fetch = (doc) => {
	const req = request
		.get(getURL(doc))
		.on('response', () => console.log(`${doc}.json downloading…`))
		.on('error', (err) => console.error(err))
		.on('end', () => console.log(`${doc}.json downloaded in ${JSON_PATH}`))
	req.pipe(fs.createWriteStream(`${JSON_PATH}/${doc}.json`))
	req.doc = doc
	return req
}

exports.fetchAll = (docs) =>
	new Promise((resolve, reject) =>
		mkdirp(JSON_PATH, (err) =>
			err ? reject(err) : resolve(docs.map(fetch))
		)
	)
