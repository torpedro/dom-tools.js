
function loadPlugins(grunt) {
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-ts');
}

function registerTasks(grunt) {
    grunt.registerTask('build', [
        'clean:build',
        'copy:src',
        'ts:src'
    ]);

    grunt.registerTask('release', [
        'build',
        'clean:release',
        'copy:release',
        'uglify:release'
    ]);
    
    grunt.registerTask('default', ['release']);
}

function configureGrunt(grunt) {
    grunt.initConfig({
        cfg: {             
            'src': './src',
            'build': './build',
            'release': './release'
        },

        watch: {
            options: {
                livereload: true
            },
            src: {
                files: [
                    '<%= cfg.src %>/**/*.ts',
                    '<%= cfg.src %>/**/*.js'
                ],
                tasks: ['release']
            }
        },
        
        copy: {
            src: {
                // Copy all src files to the build-directory
                files: [{
                    dot: true,
                    expand: true,
                    cwd: '<%= cfg.src %>/',
                    src: ['**/*'],
                    dest: '<%= cfg.build %>/src/'
                }]
            },
            release: {
                files: [
                    {
                        src: '<%= cfg.build %>/src/DomListener.d.ts',
                        dest: '<%= cfg.release %>/domlistener.d.ts'
                    },
                    {
                        src: '<%= cfg.build %>/src/DomListener.js',
                        dest: '<%= cfg.release %>/domlistener.js'
                    }
                ]
            }
        },

        clean: {
            build: {
                files: [{
                    dot: true,
                    src: '<%= cfg.build %>/*'
                }]
            },
            release: {
                files: [{
                    src: '<%= cfg.release %>/domlistener.js'
                }]
            }
        },
        
        // Compile the Typescript files to JavaScript
        ts: {
            options: {
                compiler: 'node_modules/typescript/bin/tsc',
                module: 'commonjs',
                failOnTypeErrors: true,
                fast: 'watch'
            },
            src: {
                options: {
                    declaration: true
                },
                src: ['<%= cfg.build %>/src/**/*\.ts']
            }
        },

        // Uglify for release
        uglify: {
            release: {
                files: {
                    '<%= cfg.release %>/domlistener.min.js': ['<%= cfg.build %>/src/DomListener.js']
                }
            }
        },
    });
}


/**
 * grunt entrypoint
 */
module.exports = function(grunt) {
    // load all plugins
    loadPlugins(grunt);

    // configure all plugins
    configureGrunt(grunt);

    // register tasks
    registerTasks(grunt);
};