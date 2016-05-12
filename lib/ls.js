const fs = require('mz/fs')
const { basename } = require('path')
const moment = require('moment')
const { compose, curry, groupBy, map,
	merge, prop, reduce, values } = require('ramda')
require('console.table')

const { HTML_PATH, JSON_PATH, MD_PATH } = require('./config')

const readDir = (path) =>
	fs.readdir(path).then(getFullPath(path)).then(getStats)

const toTable = compose(
	values,
	map((reduce(merge, {}))),
	groupBy(prop('name'))
)

// keep only needed info for table output
const formatStat = curry((file, stat) => {
	const [name, ext = 'html'] = basename(file).split('.')
	return { name, [ext]: moment(stat.mtime).fromNow() }
})

// add name prop to basic stat objects
const getStats = compose(
	Promise.all.bind(Promise),
	map((f) => fs.stat(f).then(formatStat(f)))
)

const getFullPath = curry((path, files) => files.map((f) => `${path}/${f}`))

// read cache to display last dates of fetch and convert
module.exports = () =>
	Promise.all([readDir(JSON_PATH), readDir(MD_PATH), readDir(HTML_PATH)])
	.then(([jsons, mds, htmls]) =>
		console.table(toTable(jsons.concat(mds, htmls)))
	)

