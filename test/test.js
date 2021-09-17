const replace = require( '../promise-file-replace' );
const fs = require( 'fs/promises' );

main();

async function main(){
    await fs.copyFile( './test/test1-source.txt', './test/test1.txt' );

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

    });
}// /main()