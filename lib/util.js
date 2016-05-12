const fs = require('fs')
const { JSON_PATH } = require('./config')

exports.forAll = (docs, action) =>
	docs.forEach((doc) =>
		fs.readFile(`${JSON_PATH}/${doc}.json`, 'utf8', (err, content) => {
			if (err) throw err
			action(doc, content)
		})
	)

exports.tildeToDash = str => str.replace('~', '-')
exports.dashToTilde = str => str.replace('-', '~')
