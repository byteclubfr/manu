const fs = require('fs')
const request = require('request')
const toMarkdown = require('to-markdown')
const mkdirp = require('mkdirp')
const homeDir = require('home-dir')

const JSON_PATH = homeDir('.manu-pages/json')
const MD_PATH = homeDir('.manu-pages/md')

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

const convert = (doc, content) => {
		const json = JSON.parse(content)
		const md = toMarkdown(json.index)
		fs.writeFile(`${MD_PATH}/${doc}.md`, md, (err) => {
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

exports.fetch = fetchAll
exports.convert = convertAll
exports.pull = pull
