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

```sh
manu fetch <doc>
```

```sh
manu convert <doc>
```

## License

ISC
