module.exports = function(grunt) {
	var autoprefixer = require('autoprefixer-core');
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		coffee:{
			compile :{
			expand: true,
			flatten: true,
			cwd: 'app/assets/js/src/coffee',
			src: ['*.coffee'],
			dest: 'app/assets/js/src/',
			ext: '.js'
			}
		},

		bower_concat: {
			js: {
				dest: 'app/assets/js/src/vendor/bower.js',
			},
			css: {
				cssDest: 'app/assets/styles/src/_bower.css',
			}
		},

		concat: {
			main:{
			src:[
				'app/assets/js/src/vendor/jquery-*.js',
				'app/assets/js/src/vendor/*.js',
				'app/assets/js/src/*.js'
			],
			dest: 'app/assets/js/build/production.js'
			}
		},

		uglify: {
			build: {
				src: '<%= concat.main.dest %>',
				dest: 'app/assets/js/build/production.min.js'
			}
		},

		imagemin: {
			sprite: {
				files: [{
					expand: true,
					cwd: 'app/assets/images/src/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'app/assets/images/src/'
				}]
			},
			// build: {
			// 	files: [{
			// 		expand: true,
			// 		cwd: 'app/assets/images/build/**/*',
			// 		src: ['**/*.{png,jpg,gif}'],
			// 		dest: 'app/assets/images/build/'
			// 	}]
			// }
		},

		sprite:{
			styl: {
				src: 'app/assets/images/src/*.png',
				retinaSrcFilter: 'app/assets/images/src/*-2x.png',
				dest: 'app/assets/images/build/sprite.png',
				retinaDest: 'app/assets/images/build/sprite@2x.png',
				padding: 1,
				destCss: 'app/assets/styles/src/_sprites.styl',
				engine: 'gmsmith',
				cssFormat: 'stylus_retina'
			}
		},

		// 		sprite:{
		// 	dist: {
		// 		src: 'app/assets/images/src/*.png',
		// 		dest: 'app/assets/images/build/sprite.png',
		// 		padding: 2,
		// 		destCss: 'app/assets/styles/src/_sprites.styl',
		// 		engine: 'gmsmith',
		// 		cssFormat: 'stylus'
		// 	},
		// 	dist_2x: {
		// 		src: 'app/assets/images/src/retina/*.png',
		// 		dest: 'app/assets/images/build/sprite@2x.png',
		// 		padding: 2,
		// 		destCss: 'app/assets/styles/src/_sprites_2x.styl',
		// 		engine: 'gmsmith',
		// 		cssFormat: 'stylus'
		// 	}
		// },

		stylus: {
			options: {
				compress: false
			},
			compile: {
				files: {
					'app/assets/styles/src/common.css': 'app/assets/styles/src/common.styl'
				}
			}
		},

		postcss: {
			options: {
				processors: [
					autoprefixer({ browsers: ['last 2 version'] }).postcss
				]
			},
			dist: { src: 'app/assets/styles/src/*.css' }
		},

		concat_css: {
			all: {
				src: ['assets/styles/src/_*', 'app/assets/styles/src/*.css'],
				dest: "app/assets/styles/build/production.css"
			}
		},

		cssmin: {
			combine: {
				files: {
					'app/assets/styles/build/production.min.css': 'app/assets/styles/build/production.css'
				}
			}
		},

		jade: {
			compile: {
				options: {
					client: false,
					pretty: true
				},
				files: [{
					cwd: "app/jade",
					src: "*.jade",
					dest: "app/",
					expand: true,
					ext: ".html"
				}]
			}
		},

		watch: { 
			options: {
				livereload: true,
			},
			scripts: {
				files: ['app/assets/js/src/*.js','app/assets/js/src/**/*.js','app/assets/js/src/**/*.coffee','bower_components/**/*'],
				tasks: ['coffee', 'bower_concat:js', 'concat', 'uglify'],
				options: {
					spawn: false,
				}
			},
			sprites:{
				files: ['app/assets/images/src/*', 'app/assets/images/build/**/*'],
				tasks: ['imagemin', 'sprite'],
				options: {
					spawn: false,
				}
			},
			css: {
				files: ['app/assets/styles/src/sprites.css', 'app/assets/styles/src/**/*','bower_components/**/*'],
				tasks: ['bower_concat:css', 'stylus', 'postcss', 'concat_css' , 'cssmin'],
				options: {
					spawn: false,
				}
			},
			html: {
				files: ['app/jade/**/*.jade'],
				tasks: ['jade'],
				options: {
					spawn: false,
				}
			}
		},

		connect: {
			options: {
				port: 3000,
				livereload: 35729,
				hostname: '0.0.0.0'
			},
			livereload: {
				options: {
					livereload: true,
					base: '.',
				},
			},
		}
	});

	grunt.registerTask('default', ['coffee', 'bower_concat:js', 'concat', 'uglify', 'bower_concat:css', 'sprite', 'stylus', 'postcss', 'imagemin', 'concat_css' , 'cssmin', 'jade']);
	grunt.registerTask('scripts', ['coffee', 'bower_concat:js', 'concat', 'uglify']);
	grunt.registerTask('css', ['bower_concat:css', 'stylus', 'postcss', 'concat_css' , 'cssmin']);
	grunt.registerTask('img', ['imagemin', 'sprite']);

	grunt.registerTask('start', ['connect:livereload', 'watch']);
};
