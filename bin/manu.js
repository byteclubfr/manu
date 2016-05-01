#!/usr/bin/env node

const args = require('optimist').argv;
const { ls, fetch, convert, pull } = require('../index')

const action = args._.shift()

const usage = () => {
console.log(`
  Usage:
    manu ls

    manu pull <doc> (fetch + convert)

    manu fetch <doc>
    manu convert <doc>
`)
}

switch (action) {
	case 'ls':
		ls()
		break;

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
