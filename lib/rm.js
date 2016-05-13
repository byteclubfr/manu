const rimraf = require('rimraf')
const { HTML_PATH, JSON_PATH, MD_PATH } = require('./config')
const { log } = require('./util')

const rmJson = (doc) => {
	log('rm', `${doc}.json`, 'removing…')
	rimraf(`${JSON_PATH}/${doc}.json`, (err) => {
		if (err) console.error(err)
		log('rm', `${doc}.json`, 'removed')
	})
}

const rmMd = (doc) => {
	log('rm', `${doc}.md`, 'removing…')
	rimraf(`${MD_PATH}/${doc}.md`, (err) => {
		if (err) console.error(err)
		log('rm', `${doc}.md`, 'removed')
	})
}

const rmHtml = (doc) => {
	log('rm', `${doc} HTML files`, 'removing…')
	rimraf(`${HTML_PATH}/${doc}`, (err) => {
		if (err) console.error(err)
		log('rm', `${doc} HTML files`, 'removed')
	})
}

module.exports.rm = (doc) => {
	rmJson(doc)
	rmMd(doc)
	rmHtml(doc)
}
