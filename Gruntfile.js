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
	        'assets/styles/build/production.css': ['assets/styles/src/*.css'],
	      },
	    }
	  },

		cssmin: { //Сжатие стилей
		  combine: {
		    files: {
		      'assets/styles/build/production.min.css': 'assets/styles/build/production.css'
		    }
		  }
		},

		watch: { 
			scripts: {
				files: ['assets/js/src/*.js','assets/js/src/**/*.js'],
				tasks: ['concat', 'uglify'],
				options: {
					spawn: false,
				},
			},
			css: {
				files: ['assets/styles/src/*.less','assets/styles/src/**/*.less','assets/styles/src/*.css'],
				tasks: ['less', 'cssjoin' ,'cssmin'],
				options: {
					spawn: false,
				},
			}
		}

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('node-spritesheet');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-cssjoin');

	grunt.loadNpmTasks('grunt-contrib-watch');


  grunt.registerTask('default', ['concat', 'uglify', 'spritesheet', 'less', 'cssjoin' , 'cssmin']);
};