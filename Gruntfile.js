module.exports = function(grunt) {
	var autoprefixer = require('autoprefixer-core');
	grunt.initConfig({
		concat: {
			dist:{
				src:[
					'assets/js/src/vendor/jquery-*.js',
					'assets/js/src/vendor/*.js',
					'assets/js/src/*.js'
				],
				dest: 'assets/js/build/production.js'
			}
		},

		uglify: {
			build: {
				src: 'assets/js/build/production.js',
				dest: 'assets/js/build/production.min.js'
			}
		},

		spritesheet:{
			compile: {
				options: {
					outputImage: 'images/build/spritesheet.png',
					outputCss: 'styles/src/sprites.less',
					selector: '.icon',
					output: {
						legacy: {
							pixelRatio: 1,
							outputImage: 'images/build/spritesheet.png'
						},
						retina: {
							pixelRatio: 2,
							outputImage: 'images/build/spritesheet@2x.png'
						}
					},
					resolveImageSelector: function( name, fullpath ) {
						return name.split( "@2x" ).join( "" );
					}
				},
				files: {
					'assets': 'assets/images/src/*'
				}
			}
		},

		less: {
			dist: {
				options: {
					paths: ["assets/styles"]
				},
				files: {
					"assets/styles/src/importer.css": "assets/styles/src/importer.less"
				}
			},
		},


		postcss: {
			options: {
				processors: [
					autoprefixer({ browsers: ['last 2 version'] }).postcss
				]
			},
			dist: { src: 'assets/styles/src/*.css' }
		},

		cssjoin: {
			join :{
				files: {
					'assets/styles/build/production.css': ['assets/styles/src/fonts.css','assets/styles/src/sprites.css','assets/styles/src/*.css']
				}
			}
		},

		cssmin: {
			combine: {
				files: {
					'assets/styles/build/production.min.css': 'assets/styles/build/production.css'
				}
			}
		},
	
		allhaml: {
			options: {
				inDir: 'haml',
				outDir: '',
				ouEx: 'html'
			},
			dist: {
				src: ['<%= allhaml.options.inDir %>/**/*.haml'],
				dest: '<%= allhaml.options.outDir %>'
			}
		},

		watch: { 
	    options: {
	      livereload: true,
	    },
			scripts: {
				files: ['assets/js/src/*.js','assets/js/src/**/*.js'],
				tasks: ['concat', 'uglify'],
				options: {
					spawn: false,
				}
			},
			sprites:{
				files: ['assets/images/src/*'],
				tasks: ['spritesheet'],
				options: {
					spawn: false,
				}
			},
			css: {
				files: ['assets/styles/src/sprites.css','assets/styles/src/*','assets/styles/src/**/*.less'],
				tasks: ['less', 'postcss', 'cssjoin' ,'cssmin'],
				options: {
					spawn: false,
				}
			},
			haml: {
				files: ['haml/**/*.haml'],
				tasks: ['allhaml'],
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

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('node-spritesheet');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-cssjoin');
	grunt.loadNpmTasks('grunt-allhaml');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.registerTask('default', ['concat', 'uglify', 'spritesheet', 'less', 'postcss', 'cssjoin' , 'cssmin', 'allhaml']);
	grunt.registerTask('scripts', ['concat', 'uglify']);
	grunt.registerTask('sprite', ['spritesheet']);
	grunt.registerTask('getless', ['less', 'postcss']);
	grunt.registerTask('css', ['postcss', 'cssjoin' , 'cssmin']);
	grunt.registerTask('allcss', ['spritesheet', 'less', 'cssjoin' , 'cssmin']);
	grunt.registerTask('haml', ['allhaml']);

	grunt.registerTask('start', ['connect:livereload', 'watch']);
};
