const homeDir = require('home-dir')

const CACHE_PATH = '.manu-pages'

exports.HTML_PATH = homeDir(`${CACHE_PATH}/html`)
exports.JSON_PATH = homeDir(`${CACHE_PATH}/json`)
exports.MD_PATH = homeDir(`${CACHE_PATH}/md`)

