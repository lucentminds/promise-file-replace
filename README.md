# promise-file-replace
NodeJs module that does search and replacements to file contents.


## Installation

Install by npm.

```shell
npm install git+https://github.com/lucentminds/promise-file-replace.git
```

### Useage:

```js
var replace = require( 'promise-file-replace' );

replace( '/path/to/file.txt', [{ search:'foo', replace:'bar'}] )
.then(function( cResultPath ){

    // All instances of "foo" replaced with "bar".
    console.log( 'Success!' );

});
```

## Examples

Regular expressions

```js
replace( '/path/to/file.txt', [{ search:/foo/g, replace:'bar'}] )
.then(function( cResultPath ){

    // All instances of "foo" replaced with "bar".
    console.log( 'Success!' );

});
```

Search and replace in multiple files.

```js
copy( ['/path/to/file1.txt', '/path/to/file2.txt'], [{ search:/foo/g, replace:'bar'}]  )
.then(function( aResultPaths ){

    console.log( 'Success!' );

});
```

Search and replace multiple terms in multiple files.

```js
copy( ['/path/to/file1.txt', '/path/to/file2.txt'], [
    { search:/foo/g, replace:'bar'},
    { search:/bork/g, replace:'bleek'},
] )
.then(function( aResultPaths ){

    /** 
    * All instances of "foo" replaced with "bar" and all instances of "bork"
    * replaced with "bleek" in all files.
    */
    console.log( 'Success!' );

});
```
