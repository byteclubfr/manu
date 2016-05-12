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

**Et voilà !**

Even better:

```sh
manu extract ramda
```

HTML files have now been extracted to `~/.manu-pages/html/ramda/`

You can browse them and follow internal links smoothly.

```sh
lynx ~/.manu-pages/html/ramda/index.html
```

**Hints:**
- You can do all the operations in one go using `manu pull ramda`
- You can target a specific version of docs if available `manu pull angular-1.5`

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

List fetched (JSON), converted (MD) and extracted (HTML) docs:

```sh
manu ls
```

List all local and available docs

```sh
manu ls -a
```

Pull = fetch + convert + extract :

```sh
manu pull <doc>
```
Download JSON raw data from devdocs.io to local cache:

```sh
manu fetch <doc>
```

Convert raw JSON to markdown:

```sh
manu convert <doc>
```

Extract HTML files from the raw JSON

```sh
manu extract <doc>
```

## License

ISC
