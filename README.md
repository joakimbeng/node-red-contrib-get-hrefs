# node-red-contrib-get-hrefs

[![Build status][travis-image]][travis-url] [![NPM version][npm-image]][npm-url] [![XO code style][codestyle-image]][codestyle-url]

> A Node-RED node to get all href urls from an HTML string

A node that extracts all `<a href="">` targets from `payload` in the input message and attaches them as an array `hrefs` on the output message.

## Installation

Install `node-red-contrib-get-hrefs` using [npm](https://www.npmjs.com/):

```bash
npm install --save node-red-contrib-get-hrefs
```

## Usage

To use the node, launch Node-RED (see [running Node-RED](http://nodered.org/docs/getting-started/running.html) for help getting started).

The input payload should be the HTML to get hrefs from.

If the input message contains a `url` property it will be used as
the `baseUrl` option for [`get-hrefs`](https://www.npmjs.com/package/get-hrefs) under the hood.

The output message will be the same as the input but with an `hrefs` array containing all found href urls in the HTML body.

## Icon credit

The node icon is the [link-variant](https://materialdesignicons.com/icon/link-variant) icon from [Material Design Icons](https://materialdesignicons.com) by Austin Andrews [@Templarian](http://twitter.com/Templarian).

## License

MIT © [Joakim Carlstein](http://joakim.beng.se)

[npm-url]: https://npmjs.org/package/node-red-contrib-get-hrefs
[npm-image]: https://badge.fury.io/js/node-red-contrib-get-hrefs.svg
[travis-url]: https://travis-ci.org/joakimbeng/node-red-contrib-get-hrefs
[travis-image]: https://travis-ci.org/joakimbeng/node-red-contrib-get-hrefs.svg?branch=master
[codestyle-url]: https://github.com/sindresorhus/xo
[codestyle-image]: https://img.shields.io/badge/code%20style-XO-5ed9c7.svg?style=flat
