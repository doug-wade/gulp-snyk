import test from 'ava';
import fn from './';

test.cb(t => {
	fn({command: 'test'}, data => {
		t.is(data, '');
		t.end();
	});
});
