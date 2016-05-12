#!/usr/bin/env node

const args = require('optimist').argv
const { fetch, convert, extract, pull } = require('../lib')
const ls = require('../lib/ls')

const action = args._.shift()

const usage = () => {
console.log(`
  Usage:
    manu ls

    manu pull <doc>    — fetch + convert + extract

    manu fetch <doc>   – download JSON from server
    manu convert <doc> – convert JSON to markdown
    manu extract <doc> – extract HTML from JSON
`)
}

switch (action) {
	case 'ls':
		ls()
		break

	case 'pull':
		pull(args._)
		break

	case 'fetch':
		fetch(args._)
		break

	case 'convert':
		convert(args._)
		break

	case 'extract':
		extract(args._)
		break

	default:
		usage()
		process.exit(1)
		break
}
