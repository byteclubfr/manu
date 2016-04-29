#!/usr/bin/env node

const args = require('optimist').argv;
const fetch = require('../fetch')
const convert = require('../convert')

const action = args._.shift()

switch (action) {
	case 'fetch':
		fetch(args._)
		break

	case 'convert':
		convert(args._)
		break

	default:
		console.error('Illegal action')
		process.exit(1)
		break
}
