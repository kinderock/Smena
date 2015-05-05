module.exports = function(grunt) {
	var autoprefixer = require('autoprefixer-core');
	require('load-grunt-tasks')(grunt);
	grunt.loadNpmTasks('grunt-spritesmith');
	grunt.loadNpmTasks('grunt-bower-concat');

	grunt.initConfig({
	coffee:{
		compile :{
		expand: true,
		flatten: true,
		cwd: 'assets/js/src/coffee',
		src: ['*.coffee'],
		dest: 'assets/js/src/',
		ext: '.js'
		}
	},

	bower_concat: {
		all: {
			dest: 'assets/js/src/vendor/_bower.js',  // Склеенный файл
		}
	},

	concat: {
		main:{
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
			src: '<%= concat.main.dest %>',
			dest: 'assets/js/build/production.min.js'
		}
	},

	//  // imagemin: {
	//  //   compress: {
	//  //     files: [{
	//  //       expand: true,
	//  //       cwd: 'assets/images/src/',
	//  //       src: ['**/*.{png,jpg,gif}'],
	//  //       dest: 'assets/images/src/'
	//  //     }]
	//  //   }
	//  // },

	//  sprite:{
	//    all: {
	//      src: 'assets/images/src/*.png',
	//      destImg: 'assets/images/build/sprite.png',
	//      destCSS: 'assets/styles/src/sprites.styl',
	//      algorithmOpts: {sort: false},
	//      padding: 10,
	//      engine: 'gmsmith',
	//      cssFormat: 'stylus'
	//      // options: {
	//      //   outputImage: 'images/build/sprite.png',
	//      //   outputCss: 'styles/src/sprites.less',
	//      //   selector: '.icon',
	//      //   // output: {
	//      //   //   legacy: {
	//      //   //     pixelRatio: 1,
	//      //   //     outputImage: 'images/build/sprite.png'
	//      //   //   },
	//      //   //   retina: {
	//      //   //     pixelRatio: 2,
	//      //   //     outputImage: 'images/build/sprite@2x.png'
	//      //   //   }
	//      //   // },
	//      //   // resolveImageSelector: function( name, fullpath ) {
	//      //   //   return name.split( "@2x" ).join( "" );
	//      //   // }
	//      // },
	//      // files: {
	//      //   'assets': 'assets/images/src/*'
	//      // }
	//    }
	//  },

	//  sass: {
	//    dist: {
	//      options: {
	//        style: 'expanded'
	//      },
	//      files: {
	//        'assets/styles/src/common.css': 'assets/styles/src/common.sass'
	//      }
	//    }
	//  },


	//  postcss: {
	//    options: {
	//      processors: [
	//        autoprefixer({ browsers: ['last 2 version'] }).postcss
	//      ]
	//    },
	//    dist: { src: 'assets/styles/src/*.css' }
	//  },

	//  cssjoin: {
	//    join :{
	//      files: {
	//        'assets/styles/build/production.css': ['assets/styles/src/fonts.css','assets/styles/src/sprites.css','assets/styles/src/*.css']
	//      }
	//    }
	//  },

	//  cssmin: {
	//    combine: {
	//      files: {
	//        'assets/styles/build/production.min.css': 'assets/styles/build/production.css'
	//      }
	//    }
	//  },
	
	//  allhaml: {
	//    options: {
	//      inDir: 'haml',
	//      outDir: '',
	//      ouEx: 'html'
	//    },
	//    dist: {
	//      src: ['<%= allhaml.options.inDir %>/**/*.haml'],
	//      dest: '<%= allhaml.options.outDir %>'
	//    }
	//  },

	//  watch: { 
	//    options: {
	//      livereload: true,
	//    },
	//    scripts: {
	//      files: ['assets/js/src/*.js','assets/js/src/**/*.js','assets/js/src/**/*.coffee'],
	//      tasks: ['coffee', 'concat', 'uglify'],
	//      options: {
	//        spawn: false,
	//      }
	//    },
	//    sprites:{
	//      files: ['assets/images/src/*'],
	//      tasks: ['sprite'],
	//      options: {
	//        spawn: false,
	//      }
	//    },
	//    css: {
	//      files: ['assets/styles/src/sprites.css','assets/styles/src/*','assets/styles/src/**/*.less'],
	//      tasks: ['less', 'postcss', 'cssjoin' ,'cssmin'],
	//      options: {
	//        spawn: false,
	//      }
	//    },
	//    haml: {
	//      files: ['haml/**/*.haml'],
	//      tasks: ['allhaml'],
	//      options: {
	//        spawn: false,
	//      }
	//    }
	//  },

	//  connect: {
	//    options: {
	//      port: 3000,
	//      livereload: 35729,
	//      hostname: '0.0.0.0'
	//    },
	//    livereload: {
	//      options: {
	//        livereload: true,
	//        base: '.',
	//      },
	//    },
	//  }
	// });

	// grunt.registerTask('default', ['coffee', 'concat', 'uglify', 'sprite', 'less', 'postcss', 'cssjoin' , 'cssmin', 'allhaml']);
	grunt.registerTask('scripts', ['coffee', 'concat', 'uglify']);
	// grunt.registerTask('img', ['sprite']);
	// grunt.registerTask('getless', ['less', 'postcss']);
	// grunt.registerTask('css', ['postcss', 'cssjoin' , 'cssmin']);
	// grunt.registerTask('allcss', ['sprite', 'less', 'cssjoin' , 'cssmin']);
	// grunt.registerTask('haml', ['allhaml']);

	// grunt.registerTask('start', ['connect:livereload', 'watch']);
};
