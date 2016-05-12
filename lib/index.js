const { convert, convertAll } = require('./convert')
const { extract, extractAll } = require('./extract')
const { fetchAll } = require('./fetch')

process.on('unhandledRejection', (reason, p) => {
	console.error('Unhandled Rejection at: Promise ', p, ' reason: ', reason)
})

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
