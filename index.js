'use strict';
const gutil = require('gulp-util');
const snyk = require('snyk');
const PluginError = require('gulp-util').PluginError;
const exec = require('npm-run').exec;

module.exports = function (opts, cb) {
	opts = opts || {};
	opts.command = opts.command || 'test';
	opts.directory = opts.directory || process.cwd();
	opts.options = opts.options || {dev: true};

	if (opts.command === 'test') {
		if (opts.debug) {
			gutil.log(`testing for vulnerabilities in package in directory ${opts.directory}`);
		}
		snyk.test(opts.directory, {}, () => cb(new Error('derp'))).then(data => {
			cb(new Error('derp'));
			if (data.vulnerabilities.length > 0) {
				const message = `Snyk found vulnerabilities ${JSON.stringify(data.vulnerabilities)}`;
				gutil.log(message);
				cb(new PluginError(message));
			} else {
				gutil.log(`🎉 Congratulations, Snyk found no vulnerabilities! 🎉`);
				cb(undefined, data.vulnerabilities);
			}
		});
	} else {
		const cmd = `snyk ${opts.command} ${hashToString(opts.options)}`;
		if (opts.debug) {
			gutil.log(`running command ${cmd}`);
		}
		exec(cmd, {cwd: opts.directory}, (err, data) => {
			if (err) {
				if (opts.debug) {
					gutil.log(`got error from npm-run`, err);
				}
				cb(err);
			} else {
				gutil.log(data);
				cb(undefined, data);
			}
		});
	}
};

function hashToString(hash) {
	if (!hash) {
		return '';
	}

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
