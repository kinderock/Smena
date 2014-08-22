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

		imagemin: { //Сжатие изображений
			dynamic: {
				files: [{
					expand: true,
					cwd: 'assets/images/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'assets/images/build/'
				}]
			}
		},

		watch: {
			scripts: {
				files: ['assets/js/src/*.js','assets/js/src/**/*.js'],
				tasks: ['concat', 'uglify'],
				options: {
					spawn: false,
				},
			}
		}

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-watch');


  grunt.registerTask('default', ['concat', 'uglify', 'imagemin']);
};