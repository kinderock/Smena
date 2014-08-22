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

		less: { //Компиляция less файлов
		  dist: {
		    options: {
		      paths: ["assets/styles"]
		    },
		    files: {
		      "assets/styles/build/production.css": "assets/styles/src/importer.less"
		    }
		  },
		},

		cssmin: {
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
				files: ['assets/styles/src/*.less','assets/styles/src/**/*.less',],
				tasks: ['less', 'cssmin'],
				options: {
					spawn: false,
				},
			}
		}

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.loadNpmTasks('grunt-contrib-watch');


  grunt.registerTask('default', ['concat', 'uglify', 'less', 'cssmin']);
};