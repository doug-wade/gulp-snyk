import test from 'ava';
import fn from './';

test.cb(t => {
	fn({command: 'test'}, (err, data) => {
		t.is(undefined, err);
		t.is(data.length, 0);
		t.end();
	});
});
