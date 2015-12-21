
function loadPlugins(grunt) {
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
    
    grunt.registerTask('default', ['build']);
}

function configureGrunt(grunt) {
    grunt.initConfig({
        cfg: {             
            'src': './src',
            'build': './build'
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
                tasks: ['build']
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
            }
        },

        clean: {
            build: {
                files: [{
                    dot: true,
                    src: '<%= cfg.build %>/*'
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
        }
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