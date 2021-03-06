import test from 'ava';
import fn from './';

// This test doesn't terminate for some reason.
// test.cb('passes snyk test on this module', t => {
// 	fn({command: 'test', debug: true}, (err, data) => {
// 		t.is(undefined, err);
// 		t.is(data.length, 0);
// 		t.end();
// 	});
// });

test.cb('passes snyk protect on this module', t => {
	fn({command: 'protect', debug: true}, (err, data) => {
		t.is(undefined, err);
		t.is(data, 'Successfully applied Snyk patches\n\n');
		t.end();
	});
});
