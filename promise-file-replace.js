/**
 * 01-30-2017
 * NodeJs module that does search and replacements to file contents.
 * ~~ Scott Johnson
 */


/** List jshint ignore directives here. **/
/* jshint undef: true, unused: true */
/* jslint node: true */

var resolve_path = require( 'promise-resolve-path' );
var read = require( 'promise-file-read' );
var write = require( 'promise-file-write' );

var replace = module.exports = function( aSrc, aTerms ){ // jshint ignore:line
    return new Promise(function( resolve, reject ){
        var cSrcType = typeof aSrc;
        var cTermsType = typeof aTerms;
        var aSources;

        switch( true ) {
        case ( cSrcType === 'string' ):
            aSrc = [aSrc];
            break;

        case Array.isArray( aSrc ):
            break;

        default:
            return reject( 'Invalid source path argument: '.concat( aSrc ) );
        }// /switch()


        switch( true ) {
        case Array.isArray( aTerms ):
            break;

        case ( cTermsType === 'object' ):
            aTerms = [aTerms];
            break;

        default:
            return reject( 'Invalid replacement terms argument: '.concat( aTerms ) );
        }// /switch()

        // Resolve source paths and verify their existance.
        resolve_path( aSrc, true )
        .then(function( aResults ){

            // Determines the global sources.
            aSources = aResults;
            
            var i, l = aSources.length, aPromises = [];

            // Loop over each source.
            for( i = 0, l; i < l; i++ ) {
                aPromises.push( replaceOneFile( aSources[ i ], aTerms ) );
            }// /for()
            
            // Either wait for all paths to be copied or reject one.
            return Promise.all( aPromises );
        
        })
        .then(function( aReplaced ){
            if( cSrcType === 'string' )  {
                resolve( aReplaced[0] );
            }
            else {
                resolve( aReplaced );
            }
        })
        .catch(function( err ){
            reject( err );
        });

    });
};// /copy()

var replaceOneFile = function( cPathSrc, aTerms ) {
    return read( cPathSrc )
    .then( function( cContent ) {
        var i, l = aTerms.length;

        // Loop over each term.
        for( i = 0, l; i < l; i++ ) {
            cContent = cContent.replace( aTerms[ i ].search, aTerms[ i ].replace );
        }// /for()

       return write( cPathSrc, cContent );
    });
};// /replaceOneFile()