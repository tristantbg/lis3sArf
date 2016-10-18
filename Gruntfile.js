module.exports = function(grunt) {
    grunt.initConfig({
        concat: {
            plugins: {
                src: ['assets/oembed/oembed.min.js', 'swiper/wipe_coverImages.js', 'lib/viewport-units-buggyfill/viewport-units-buggyfill.js', 'lib/gsap/src/minified/TweenMax.min.js', 'lib/gsap/src/minified/utils/Draggable.min.js', 'assets/js/vendor/gsap/ThrowPropsPlugin.min.js', 'lib/lazysizes/lazysizes.min.js', 'lib/lazysizes/plugins/optimumx/ls.optimumx.min.js', 'lib/history.js/scripts/bundled/html4+html5/jquery.history.js'],
                dest: 'assets/js/plugins.concat.js'
            },
            js: {
                src: ['assets/js/app.js'],
                dest: 'assets/js/app.concat.js'
            },
        },
        uglify: {
            plugins: {
                src: 'assets/js/plugins.concat.js',
                dest: 'assets/js/build/plugins.js'
            },
            build: {
                src: 'assets/js/app.concat.js',
                dest: 'assets/js/build/app.min.js',
                options: {
                    sourceMap: true
                }
            }
        },
        stylus: {
            compile: {
                options: {
                    use: [
                        require('rupture')
                    ],
                },
                files: {
                    'assets/css/app.min.css': 'assets/css/app.styl'
                }
            }
        },
        cssmin: {
          options: {
            shorthandCompacting: true,
            roundingPrecision: -1
          },
          target: {
            files: {
              'assets/css/build/build.min.css': ['lib/normalize-css/normalize.css', 'assets/oembed/oembed.css', 'assets/css/app.min.css']
            }
          }
        },
        watch: {
            js: {
                files: ['lib/**/*.js', 'assets/js/**/!(app.min|app.concat).js'],
                tasks: ['javascript'],
                options: {
                    livereload: true,
                }
            },
            css: {
                files: ['assets/css/**/*.styl'],
                tasks: ['stylesheets'],
                options: {
                    livereload: true,
                }
            }
        },
        php: {
            test: {
                options: {
                    keepalive: true,
                    port: 5000,
                    open: true
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-php');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('javascript', ['concat', 'uglify']);
    grunt.registerTask('stylesheets', ['stylus', 'cssmin']);
    grunt.registerTask('test', ['php', 'mocha']);
    grunt.registerTask('default', ['javascript', 'stylesheets', 'watch', 'php']);
};