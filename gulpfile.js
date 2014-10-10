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

	SRC = './src/app.js',
	OUT = './app.js',
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

gulp.task('build', ['html'], function() {
	browserify( SRC )
	.transform( transform )
	.bundle()
	.pipe( source( OUT ))
	.pipe( streamify( uglify({
		output: { ascii_only: true
	}})))
	.pipe( gulp.dest( DEST ));
});

gulp.task( 'watch', function() {
	var bundler = watchify( SRC )
	.transform( transform )
	.on( 'update', rebundle );

	function rebundle() {
		return bundler.bundle()
		.on( 'error', function( error ) {
			console.log( 'Browserify error:', error );
		})
		.pipe( source( OUT ))
		.pipe( gulp.dest( DEST ));
	}

	return rebundle();
});

gulp.task('html', function() {
	gulp.src( './src/index.html' )
	.pipe( gulp.dest( DEST ));
});

gulp.task('clean', function( done ) {
	del([ './dist' ], done);
});
