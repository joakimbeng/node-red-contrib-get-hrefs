'use strict';
const getHrefs = require('get-hrefs');

module.exports = exports = function (RED) {
	function GetHrefsNode(config) {
		RED.nodes.createNode(this, config);
		this.on('input', msg => {
			const html = msg.payload;
			const baseUrl = msg.url;
			const hrefs = getHrefs(html, {baseUrl});
			this.send(Object.assign({hrefs}, msg));
		});
	}
	RED.nodes.registerType('get-hrefs', GetHrefsNode);
};
