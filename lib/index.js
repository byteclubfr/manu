const fs = require('mz/fs')
const mkdirp = require('mkdirp')
const rimraf = require('rimraf')
const { mapObjIndexed } = require('ramda')

const { HTML_PATH } = require('./config')
const { convert, convertAll } = require('./convert')
const fetchAll = require('./fetch')
const { forAll } = require('./util')

process.on('unhandledRejection', (reason, p) => {
	console.error('Unhandled Rejection at: Promise ', p, ' reason: ', reason)
})

// HTML extraction

// local browsing
const RE_HREF = /href="(.*?)"/g
const replaceHref = (content) => {
	return content.replace(RE_HREF, (_, href) => {
		if (!href.startsWith('http')) {
			const s = href.split('#')
			if (s.length === 1) {
				href = `${href}.html`
			} else if (s[0] && s[1]){
				href = `${s[0]}.html#${s[1]}`
			}
			href = href.replace(/\//g, '-')
		}
		return `href="${href}"`
	})
}

const toHTML = (content) => `
<!doctype html>
<html>
<head>
<meta charset="utf8">
</head>
<body>${replaceHref(content)}</body>
</html>`

const extract = (doc, content) => {
	const p = `${HTML_PATH}/${doc}`
	// fresh cache and dates for ls command
	rimraf(p, (err) => {
		if (err) throw err
		mkdirp(p, (err) => {
			if (err) throw err
			mapObjIndexed((v, k) => {
				const page = k.replace(/\//g, '-')
				fs.writeFile(`${p}/${page}.html`, toHTML(v), (err) => {
					if (err) throw err
					console.log(`${page}.html generated in ${p}`)
				})
			}, JSON.parse(content))
		})
	})
}

const extractAll = (docs) => forAll(docs, extract)

// fetch + convert + extract
const pull = (docs) => {
	fetchAll(docs).then((reqs) =>
		reqs.forEach((req) => {
			const chunks = []
			req.on('data', (chunk) => chunks.push(chunk))
			req.on('end', () => {
				const data = Buffer.concat(chunks).toString()
				convert(req.doc, data)
				extract(req.doc, data)
			})
		})
	)
}

exports.fetch = fetchAll
exports.convert = convertAll
exports.extract = extractAll
exports.pull = pull
