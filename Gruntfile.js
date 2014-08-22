module.exports = function(grunt) {
  grunt.initConfig({
    concat: {
    	dist:{
    		src:[
    			'assets/js/src/vendor/jquery-*.js',
    			'assets/js/src/vendor/*.js',
    			'assets/js/src/*.js'
    		],
    		dest: 'assets/js/dist/production.js'
    	}
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['concat']);
};