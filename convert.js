const fs = require('fs')
const toMarkdown = require('to-markdown')
const mkdirp = require('mkdirp')
const homeDir = require('home-dir')

const JSON_PATH = homeDir('.manu-pages/json')
const MD_PATH = homeDir('.manu-pages/md')

module.exports = (docs) => {
	mkdirp(MD_PATH, (err) => {
		if (err) throw err

		docs.forEach((doc) => {
			fs.readFile(`${JSON_PATH}/${doc}.json`, 'utf8', (err, content) => {
				if (err) throw err

				const json = JSON.parse(content)
				const md = toMarkdown(json.index)
				fs.writeFile(`${MD_PATH}/${doc}.md`, md, (err) => {
					if (err) throw err

					console.log(`${doc}.md generated in ${MD_PATH}`)
				})
			})
		})
	})
}
