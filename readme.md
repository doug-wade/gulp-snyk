# gulp-snyk [![Build Status](https://travis-ci.org/doug-wade/gulp-snyk.svg?branch=master)](https://travis-ci.org/doug-wade/gulp-snyk) ![appveyor build status](https://ci.appveyor.com/api/projects/status/github/doug-wade/gulp-snyk?branch=master&svg=true)

> gulp plugin for using Snyk


## Install

```
$ npm install --save-dev gulp-snyk
```

Or

```
$ yarn add --dev gulp-snyk
```

## Usage

To only break the build on vulnerabilities, use snyk without any options

```javascript
const snyk = require('gulp-snyk');
gulp.task('protect', function(cb) {
  return snyk({ command: 'protect' }, cb);
});
gulp.task('test', function() {
  return snyk({ command: 'test' }, cb);
});
gulp.task('prepublish', 'protect');
```

And then, in your package.json

```javascript
{
  "scripts": {
    "prepublish": "gulp prepublish",
    "test": "gulp test"
  }
}
```

For a realistic use-case, check out [the clefs plugin generator](https://github.com/doug-wade/clefs/tree/master/packages/generator-clefs-plugin)

## API

### snyk([options], cb)

#### options

A hash of options to configure snyk.  If this is omitted, then it is the
equivalent of passing the following options hash.

```javascript
gulp.task('snyk-test', function(cb) {
	return snyk({command: 'test', directory: process.cwd(), debug: false, options: { dev: true }}, cb);
});
```

##### command

Type: `string`<br>
Default: `test`
Example:
```javascript
gulp.task('protect', function(cb) {
	return snyk({command: 'protect'}, cb);
});
```

One of the [snyk command-line commands](https://snyk.io/docs/using-snyk/).
For instance: auth, test, wizard, protect, monitor, policy.

##### directory

Type: `string`<br>
Default: `process.cwd()`
Example:
```javascript
gulp.task('snyk-test', function(cb) {
	return snyk({command: 'test', directory: path.join(process.cwd(), 'packages', 'my-package')}, cb);
});
```

The directory that contains the package on which to run the snyk command.

##### options

Type: `object`<br>
Default: `{ dev: true }`
Example:
```javascript
gulp.task('snyk-wizard', function(cb) {
	return snyk({command: 'wizard', options: {help: true}}, cb);
});
```

The options supported by the [snyk command line](https://snyk.io/docs/using-snyk/).

##### debug

Type: `boolean`<br>
Default: `false`
Example:
```javascript
gulp.task('snyk-help', function(cb) {
	return snyk({command: 'test', debug: true}, cb);
});
```

Turns on debug logging

#### cb

The callback from the asynchronous gulp task, the function passed as the first
argument to the gulp task callback.  For example:

```javascript
gulp.task('protect', function(cb) {
  return snyk({ command: 'protect' }, cb);
});
```

## License

MIT © [Doug Wade](http://dougwade.io)
