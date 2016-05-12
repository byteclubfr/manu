const fs = require('fs')
const { JSON_PATH } = require('./config')
const c = require('chalk')

exports.log = (type, subject, info) =>
	console.log('[%s] %s %s %s', c.cyan('info'), c.bold(type), c.blue(subject), info)

exports.forAll = (docs, action) =>
	docs.forEach((doc) =>
		fs.readFile(`${JSON_PATH}/${doc}.json`, 'utf8', (err, content) => {
			if (err) throw err
			action(doc, content)
		})
	)

exports.tildeToDash = str => str.replace('~', '-')
exports.dashToTilde = str => str.replace('-', '~')
