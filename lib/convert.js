const fs = require('mz/fs')
const mkdirp = require('mkdirp')
const toMarkdown = require('to-markdown')
const { compose, join, mapObjIndexed, values } = require('ramda')

const { MD_PATH } = require('./config')
const { forAll, log } = require('./util')

// markdown conversion
// docs can be separated in many pages, for now we just concatenate them with <hr>
const toMd = compose(
	join('\n\n----------\n\n'),
	values,
	mapObjIndexed((v, k) => toMarkdown(`\n# ${k}\n\n${v}`)),
	JSON.parse
)

const convert = exports.convert = (doc, content) => {
	log('convert', `${doc}.md`, 'generating…')
	fs.writeFile(`${MD_PATH}/${doc}.md`, toMd(content), (err) => {
		if (err) throw err
		log('convert', `${doc}.md`, `generated in ${MD_PATH}`)
	})
}

exports.convertAll = (docs) =>
	mkdirp(MD_PATH, (err) => {
		if (err) throw err
		forAll(docs, convert)
	})


