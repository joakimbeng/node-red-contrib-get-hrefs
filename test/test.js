import test from 'ava';
import getHrefsNode from '../src/get-hrefs';

const red = (config = {}) => {
	const _registered = new Map();
	const _listeners = new Map();
	const _receivers = [];
	return {
		nodes: {
			createNode(node) {
				node.on = (evt, cb) => {
					_listeners.set(evt, cb);
				};
				node.send = msg => {
					_receivers.forEach(cb => cb(msg));
					_receivers.length = 0;
				};
			},
			registerType(name, Node) {
				_registered.set(name, new Node(config));
			}
		},
		_registered,
		_listeners,
		_emit(evt, msg) {
			if (_listeners.has(evt)) {
				return _listeners.get(evt)(msg);
			}
		},
		_receive() {
			return new Promise(resolve => {
				_receivers.push(resolve);
			});
		}
	};
};

test('type is registered', t => {
	const RED = red();
	getHrefsNode(RED);
	t.ok(RED._registered.has('get-hrefs'));
});

test('sends msg on input', async t => {
	const RED = red();
	getHrefsNode(RED);
	const msg = {
		payload: {
			body: '<html>Lorem ipsum</html>'
		}
	};
	const receiver = RED._receive();
	RED._emit('input', msg);
	const newMsg = await receiver;
	t.ok(newMsg);
	t.ok(newMsg.payload);
	t.is(newMsg.payload.body, msg.payload.body);
});

test('includes found hrefs in payload', async t => {
	const RED = red();
	getHrefsNode(RED);
	const msg = {
		payload: {
			body: `
				<html>
					Lorem ipsum
					<a href="http://example.com">Click me</a>
				</html>
			`
		}
	};
	const receiver = RED._receive();
	RED._emit('input', msg);
	const newMsg = await receiver;
	t.ok(newMsg);
	t.ok(Array.isArray(newMsg.payload.hrefs));
	t.is(newMsg.payload.hrefs.length, 1);
	t.is(newMsg.payload.hrefs[0], 'http://example.com');
});

test('uses url from payload as baseUrl', async t => {
	const RED = red();
	getHrefsNode(RED);
	const msg = {
		payload: {
			url: 'http://example.com',
			body: `
				<html>
					Lorem ipsum
					<a href="/path">Click me</a>
				</html>
			`
		}
	};
	const receiver = RED._receive();
	RED._emit('input', msg);
	const newMsg = await receiver;
	t.ok(newMsg);
	t.ok(Array.isArray(newMsg.payload.hrefs));
	t.is(newMsg.payload.hrefs.length, 1);
	t.is(newMsg.payload.hrefs[0], 'http://example.com/path');
});
