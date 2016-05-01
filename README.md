[![npm version](https://badge.fury.io/js/manu.svg)](http://badge.fury.io/js/manu)
[![Dependency Status](https://david-dm.org/byteclubfr/manu.png)](https://david-dm.org/byteclubfr/manu)

# manu

**Read [devdocs.io](http://devdocs.io/) content from your cozy terminal.**

[mad](https://github.com/tj/mad) is a nice tool to view docs written in markdown like regular `man` pages.

*Unfortunately* it provides only [outdated content](https://github.com/tj/mad-pages) by default.

`manu` is a tool that queries the **devdocs.io** database to retrieve fresh data which can then be used by `mad`.

## Example

Let's say you want to grab the [ramda](http://ramdajs.com/0.21.0/docs/) docs:

```sh
manu fetch ramda
```

This will download the content of devdocs.io to `~/.manu-pages/json/ramda.json`

```sh
manu convert ramda
```

This will convert the previously fetched JSON file to `~/.manu-pages/md/ramda.md`

```sh
mad ramda
```

Et voilà !

**Hint:** You can do both operations in one go using `manu pull ramda`

## Install

Install [mad](https://github.com/tj/mad), then:

```sh
npm i -g manu
```

Add this variable to your shell:

```sh
export MAD_PATH=~/.manu-pages/md
```

## Usage

List fetched and converted docs:

```sh
manu ls
```

Pull = fetch + convert:

```sh
manu pull <doc>
```
Download json raw data from devdocs.io to local cache:

```sh
manu fetch <doc>
```

Convert raw json to markdown:

```sh
manu convert <doc>
```

## License

ISC
