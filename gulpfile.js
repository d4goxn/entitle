'use strict';

var browserify = require( 'browserify' ),
	del = require( 'del' ),
	gulp = require( 'gulp' ),
	streamify = require( 'gulp-streamify' ),
	uglify = require( 'gulp-uglify' ),
	source = require( 'vinyl-source-stream' ),
	watchify = require( 'watchify' ),
	through = require( 'through' ),
	reactTransform = require( 'react-tools' ).transform,
	path = require( 'path' ),

	APP = 'render-app.js',
	HTML = 'index.html',

	SRC = './src',
	DEST = './dist';

function transform( filename ) {
	var code = '';

	return through(
		function( data ) { code += data; },
		function() {

			try {
				this.queue( reactTransform( code ) );
			} catch( error ) {
				console.log( 'Error:', filename, error );
			}

			this.queue( null );
		}
	);
}

gulp.task('build', [ 'html' ], function() {
	browserify( './' + path.join( SRC, APP ))
	.transform( transform )
	.bundle()
	.pipe( source( APP ))
	.pipe( streamify( uglify({
		output: { ascii_only: true
	}})))
	.pipe( gulp.dest( DEST ));
});

gulp.task( 'watch', function() {
	gulp.watch( SRC, [ 'build' ]);
});

gulp.task('html', function() {
	gulp.src( './' + path.join( SRC, HTML ))
	.pipe( gulp.dest( DEST ));
});

gulp.task('clean', function( done ) {
	del([ DEST ], done);
});
