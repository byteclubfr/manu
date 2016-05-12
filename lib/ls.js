const fs = require('mz/fs')
const { basename, extname } = require('path')
const moment = require('moment')
const { compose, curry, groupBy, map,
	merge, prop, reduce, values } = require('ramda')
require('console.table')

const { HTML_PATH, JSON_PATH, MD_PATH } = require('./config')
const { fetch } = require('./fetch')
const { tildeToDash } = require('./util')

const readDir = (path) =>
	fs.readdir(path).then(getFullPath(path)).then(getStats)

const toTable = compose(
	values,
	map((reduce(merge, {}))),
	groupBy(prop('name'))
)

// keep only needed info for table output
const formatStat = curry((file, stat) => {
	const ext = extname(file)
	const name = basename(file, ext)
	return { name, [ext || 'html']: moment(stat.mtime).fromNow() }
})

// add name prop to basic stat objects
const getStats = compose(
	Promise.all.bind(Promise),
	map((f) => fs.stat(f).then(formatStat(f)))
)

const getFullPath = curry((path, files) => files.map((f) => `${path}/${f}`))

const getLocalFiles = () => Promise.all([readDir(JSON_PATH), readDir(MD_PATH), readDir(HTML_PATH)])
	.then(([jsons, mds, htmls]) => jsons.concat(mds, htmls))

// read cache to display last dates of fetch, convert and extract
exports.ls = () => getLocalFiles().then(xs => console.table(toTable(xs)))

exports.lsRemote = () => {
	const chunks = []
	const req = fetch('docs')
	req.on('data', (chunk) => chunks.push(chunk))
	req.on('end', () => {
		const data = Buffer.concat(chunks).toString()
		const docs = JSON.parse(data).map(d => ({
			name: tildeToDash(d.slug),
			remote: moment(d.mtime, 'X').fromNow()
		}))
		getLocalFiles().then(xs => console.table(toTable(docs.concat(xs))))
	})
}
