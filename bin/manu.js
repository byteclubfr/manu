#!/usr/bin/env node

const args = require('optimist').argv;
const { fetch, convert, pull } = require('../index')

const action = args._.shift()

const usage = () => {
console.log(`
  Usage:
    manu pull <doc> (fetch + convert)

    manu fetch <doc>
    manu convert <doc>
`)
}

switch (action) {
	case 'pull':
		pull(args._)
		break

	case 'fetch':
		fetch(args._)
		break

	case 'convert':
		convert(args._)
		break

	default:
		usage()
		process.exit(1)
		break
}
