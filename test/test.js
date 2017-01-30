var replace = require( '../promise-file-replace' );


replace( './test/test1.txt', [
    {
        search: /lorem/ig,
        replace: '***********'
    },
    {
        search: 'elit',
        replace: '--------'
    },
    {
        search: /AENEAN/i,
        replace: '+++++++++'
    }
])
.then(function( aResults ){
    console.log( aResults );

}).done();