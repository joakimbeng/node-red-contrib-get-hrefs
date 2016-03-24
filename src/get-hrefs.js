'use strict';
const getHrefs = require('get-hrefs');

module.exports = exports = function (RED) {
	function GetHrefsNode(config) {
		RED.nodes.createNode(this, config);
		this.oneHrefPerMsg = Boolean(config.oneHrefPerMsg);
		this.on('input', msg => {
			const html = msg.payload;
			const baseUrl = msg.url;
			const hrefs = getHrefs(html, {baseUrl});
			if (this.oneHrefPerMsg) {
				if (hrefs.length) {
					this.send([hrefs.map(href => Object.assign({}, msg, {href}))]);
				}
			} else {
				this.send(Object.assign({}, msg, {hrefs}));
			}
		});
	}
	RED.nodes.registerType('get-hrefs', GetHrefsNode);
};
