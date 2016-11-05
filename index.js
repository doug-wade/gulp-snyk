'use strict';
const cp = require('child_process');
const gutil = require('gulp-util');
const snyk = require('snyk');
const PluginError = require('gulp-util').PluginError;

module.exports = function (opts, cb) {
	opts = opts || {};
	opts.directory = opts.directory || process.cwd();

	if (opts.command === 'test') {
		if (opts.debug) {
			gutil.log(`testing for vulnerabilities in package in directory ${opts.directory}`);
		}
		snyk.test(opts.directory).then(data => {
			if (data.vulnerabilities.length < 1) {
				const message = `Snyk found vulnerabilities ${JSON.stringify(data.vulnerabilities)}`;
				gutil.log(message);
				cb(new PluginError(message));
			} else {
				gutil.log(`snyk found no vulnerabilities!`);
				cb();
			}
		});
	} else {
		const cmd = `${opts.directory}/node_modules/.bin/snyk ${opts.command} ${hashToString(opts.options)}`;
		if (opts.debug) {
			gutil.log(`running command ${cmd}`);
		}
		cp.exec(cmd, (err, data) => {
			if (err) {
				cb(err);
			} else {
				gutil.log(data);
				cb(undefined, data);
			}
		});
	}
};

function hashToString(hash) {
	let str = '';
	Object.keys(hash).forEach(key => {
		if (typeof hash[key] === 'string') {
			str += ' --' + key + ' ' + hash[key];
		} else {
			str += ' --' + key;
		}
	});
	return str;
}
