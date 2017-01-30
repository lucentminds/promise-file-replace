/**
 * 01-30-2017
 * NodeJs module that does search and replacements to file contents.
 * ~~ Scott Johnson
 */


/** List jshint ignore directives here. **/
/* jshint undef: true, unused: true */
/* jslint node: true */

var Q = require( 'q' );
var resolve = require( 'promise-resolve-path' );
var read = require( 'promise-file-read' );
var write = require( 'promise-file-write' );

var replace = module.exports = function( aSrc, aTerms ){ // jshint ignore:line
    var deferred = Q.defer();
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
        deferred.reject( 'Invalid source path argument: '.concat( aSrc ) );
        return deferred.promise;

    }// /switch()


    switch( true ) {
    case Array.isArray( aTerms ):
        break;

    case ( cTermsType === 'object' ):
        aTerms = [aTerms];
        break;

    default:
        deferred.reject( 'Invalid replacement terms argument: '.concat( aTerms ) );
        return deferred.promise;

    }// /switch()

    // Resolve source paths and verify their existance.
    resolve( aSrc, true )
    .then(function( aResults ){

        // Determines the global sources.
        aSources = aResults;
        
        var i, l = aSources.length, aPromises = [];

        // Loop over each source.
        for( i = 0, l; i < l; i++ ) {
            aPromises.push( replaceOneFile( aSources[ i ], aTerms ) );
        }// /for()
        
        // Either wait for all paths to be copied or reject one.
       return Q.all( aPromises );
       
    })
    .then(function( aReplaced ){
        if( cSrcType === 'string' )  {
            deferred.resolve( aReplaced[0] );
        }
        else {
            deferred.resolve( aReplaced );
        }
    })
    .fail(function( err ){
       deferred.reject( err );
    }).done();

    return deferred.promise;
};// /copy()

var replaceOneFile = function( cPathSrc, aTerms ) {
    //var deferred = Q.defer();

    return read( cPathSrc )
    .then( function( cContent ) {
        var i, l = aTerms.length;

        // Loop over each term.
        for( i = 0, l; i < l; i++ ) {
            cContent = cContent.replace( aTerms[ i ].search, aTerms[ i ].replace );
        }// /for()

       return write( cPathSrc, cContent );
    });

    //return deferred.promise;
};// /copyOneFile()