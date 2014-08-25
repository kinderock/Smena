module.exports = function(grunt) {
	grunt.initConfig({
		concat: { //Склейка скриптов
			dist:{
				src:[
					'assets/js/src/vendor/jquery-*.js',
					'assets/js/src/vendor/*.js',
					'assets/js/src/*.js'
				],
				dest: 'assets/js/build/production.js'
			}
		},

		uglify: { //Сжатие скриптов
			build: {
				src: 'assets/js/build/production.js',
				dest: 'assets/js/build/production.min.js'
			}
		},

		spritesheet:{ //Склейка спрайтов
			compile: {
				options: {
					outputImage: 'images/build/spritesheet.png',
					outputCss: 'styles/src/sprites.css',
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

		less: { //Компиляция less файлов
			dist: {
				options: {
					paths: ["assets/styles"]
				},
				files: {
					"assets/styles/src/importer.css": "assets/styles/src/importer.less"
				}
			},
		},

		cssjoin: { //Склейка стилей
			join :{
				files: {
					'assets/styles/build/production.css': ['assets/styles/src/*.css']
				}
			}
		},

		cssmin: { //Сжатие стилей
			combine: {
				files: {
					'assets/styles/build/production.min.css': 'assets/styles/build/production.css'
				}
			}
		},
	
		allhaml: { //Сборка  haml шаблонов
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

		//TODO: сделать нормальную склейку файлов после генерации спрайтов
		watch: { 
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
				tasks: ['less', 'cssjoin' ,'cssmin'],
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


	grunt.registerTask('default', ['concat', 'uglify', 'spritesheet', 'less', 'cssjoin' , 'cssmin', 'allhaml']);
	grunt.registerTask('haml', ['allhaml']);
};