'use strict';
const getHrefs = require('get-hrefs');

module.exports = exports = function (RED) {
	function GetHrefsNode(config) {
		RED.nodes.createNode(this, config);
		this.on('input', msg => {
			const html = msg.payload.body;
			const baseUrl = msg.payload.url;
			const hrefs = getHrefs(html, {baseUrl});
			msg.payload = Object.assign({hrefs}, msg.payload);
			this.send(msg);
		});
	}
	RED.nodes.registerType('get-hrefs', GetHrefsNode);
};
