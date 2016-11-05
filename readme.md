# gulp-snyk [![Build Status](https://travis-ci.org/doug-wade/gulp-snyk.svg?branch=master)](https://travis-ci.org/doug-wade/gulp-snyk)

> gulp plugin for using Snyk


## Install

```
$ npm install --save-dev gulp-snyk
```


## Usage

To only break the build on vulnerabilities, use snyk without any options

```js
const snyk = require('gulp-snyk');
gulp.task('protect', function(cb) {
  return snyk({ command: 'protect' });
});
gulp.task('test', function() {
  return snyk({ command: 'test' });
});
gulp.task('prepublish', 'protect');
```

And then, in your package.json

```js
{
  "scripts": {
    "prepublish": "gulp prepublish",
    "test": "gulp test"
  }
}
```

## API

### snyk([options])

#### options

##### command

Type: `string`<br>
Default: `test`
Example:
```js
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
```js
gulp.task('snyk-test', function(cb) {
	return snyk({command: 'test', directory: path.join(process.cwd(), 'packages', 'my-package')}, cb);
});
```

The directory to run the snyk command in

##### options

Type: `object`<br>
Default: `{ dev: true }`
Example:
```js
gulp.task('snyk-wizard', function(cb) {
	return snyk({command: 'wizard', options: {help: true}}, cb);
});
```

The options supported by the snyk command line

##### debug

Type: `boolean`<br>
Default: `false`
Example:
```js
gulp.task('snyk-help', function(cb) {
	return snyk({command: 'test', debug: true}, cb);
});
```

Turns on debug logging

## License

MIT © [Doug Wade](http://dougwade.io)
