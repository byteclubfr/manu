#!/usr/bin/env node

const args = require('optimist').argv
const { fetch, convert, extract, pull } = require('../lib')
const { ls, lsRemote } = require('../lib/ls')
const { rm } = require('../lib/rm')
const { tildeToDash } = require('../lib/util')

const action = args._.shift()
const docs = args._.map(tildeToDash)

const usage = () => {
console.log(`
  Usage:
    manu ls            – list local docs
    manu ls -a         – list local and remote docs

    manu pull <doc>    — fetch + convert + extract

    manu fetch <doc>   – download JSON from server
    manu convert <doc> – convert JSON to markdown
    manu extract <doc> – extract HTML from JSON

    manu rm <doc>      – remove local files
`)
}

switch (action) {
	case 'ls':
		args.a ? lsRemote () : ls()
		break

	case 'pull':
		pull(docs)
		break

	case 'fetch':
		fetch(docs)
		break

	case 'convert':
		convert(docs)
		break

	case 'extract':
		extract(docs)
		break

	case 'rm':
		rm(docs)
		break

	default:
		usage()
		process.exit(1)
		break
}
