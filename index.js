const fs = require('mz/fs')
const { basename } = require('path')
const request = require('request')
const toMarkdown = require('to-markdown')
const mkdirp = require('mkdirp')
const homeDir = require('home-dir')
const moment = require('moment')
const { compose, curry, groupBy, join,  map, mapObjIndexed,
	merge, prop, reduce, values } = require('ramda')
require('console.table')

const JSON_PATH = homeDir('.manu-pages/json')
const MD_PATH = homeDir('.manu-pages/md')

process.on('unhandledRejection', (reason, p) => {
	console.error('Unhandled Rejection at: Promise ', p, ' reason: ', reason)
});
// utils

// keep only needed info for table output
const formatStat = curry((file, stat) => {
	const [name, ext] = basename(file).split('.')
	return { name, [ext]: moment(stat.mtime).fromNow() }
})

// add name prop to basic stat objects
const getStats = compose(
	Promise.all.bind(Promise),
	map((f) => fs.stat(f).then(formatStat(f)))
)

const getFullPath = curry((path, files) => files.map((f) => `${path}/${f}`))

const readDir = (path) =>
	fs.readdir(path).then(getFullPath(path)).then(getStats)

const toTable = compose(
	values,
	map((reduce(merge, {}))),
	groupBy(prop('name'))
)

// read cache to display last dates of fetch and convert
const ls = () =>
	Promise.all([readDir(JSON_PATH), readDir(MD_PATH)])
	.then(([jsons, mds]) =>
		console.table(toTable(jsons.concat(mds)))
	)

const fetch = (doc) => {
	const req = request
		.get(`http://docs.devdocs.io/${doc}/db.json?${Date.now()}`)
		.on('error', (err) => console.error(err))
		.on('end', () => console.log(`${doc}.json downloaded in ${JSON_PATH}`))
	req.pipe(fs.createWriteStream(`${JSON_PATH}/${doc}.json`))
	req.doc = doc
	return req
}

const fetchAll = (docs) =>
	new Promise((resolve, reject) =>
		mkdirp(JSON_PATH, (err) =>
			err ? reject(err) : resolve(docs.map(fetch))
		)
	)

// docs can be separated in many pages, for now we just concatenate them with <hr>
const toMd = compose(
	join('\n\n----------\n\n'),
	values,
	mapObjIndexed((v, k) => toMarkdown(`\n# ${k}\n\n${v}`)),
	JSON.parse
)

const convert = (doc, content) => {
		fs.writeFile(`${MD_PATH}/${doc}.md`, toMd(content), (err) => {
			if (err) throw err
			console.log(`${doc}.md generated in ${MD_PATH}`)
		})
}

const convertAll = (docs) =>
	mkdirp(MD_PATH, (err) => {
		if (err) throw err

		docs.forEach((doc) => {
			fs.readFile(`${JSON_PATH}/${doc}.json`, 'utf8', (err, content) => {
				if (err) throw err
				convert(doc, content)
			})
		})
	})

// fetch + convert
const pull = (docs) => {
	fetchAll(docs).then((reqs) =>
		reqs.forEach((req) => {
			const chunks = []
			req.on('data', (chunk) => chunks.push(chunk))
			req.on('end', () => convert(req.doc, Buffer.concat(chunks).toString()))
		})
	)
}

exports.ls = ls
exports.fetch = fetchAll
exports.convert = convertAll
exports.pull = pull
