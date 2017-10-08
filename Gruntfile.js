/* ========================================================================
 * FindExentTool
 * @file Gruntfile.js
 * @summary Grunt file for task automation
 * @version 1.2.0
 * @author Vern Wolfley
 * ========================================================================
 * @copyright 2017 Vern Wolfley
 * @license MIT
 * ========================================================================
 */
module.exports = function(grunt) {

    "use strict";

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        pkg: grunt.file.readJSON("package.json"),

        cssBanner: "/*! ========================================================================\n" +
            " * <%= pkg.name %>\n" +
            " * @file main.css\n" +
            " * @summary main css file for project\n" +
            " * @version <%= pkg.version %>\n" +
            " * Production | <%= pkg.date %>\n" +
            " * @author <%= pkg.author %>\n" +
            " * ==========================================================================\n" +
            " * @copyright 2017 Vern Wolfley\n" +
            " * @licensed MIT\n" +
            " * ========================================================================== */\n",


        jsBanner: "/*! ========================================================================\n" +
            " * <%= pkg.name %>\n" +
            " * @file main_concat.min.js\n" +
            " * @summary minified and concatenated JavaScript files for project\n" +
            " * @version <%= pkg.version %>\n" +
            " * Production | <%= pkg.date %>\n" +
            " * @author <%= pkg.author %>\n" +
            " * ==========================================================================\n" +
            " * @copyright 2017 Vern Wolfley\n" +
            " * @licensed MIT\n" +
            " * ========================================================================== */\n",

        htmlhint: {
            build: {
                options: {
                    "tag-pair": true, // Force tags to have a closing pair
                    "tagname-lowercase": true, // Force tags to be lowercase
                    "tag-self-close": true, // The empty tag must closed by self
                    "attr-lowercase": true, // Force attribute names to be lowercase e.g. <div id="header"> is invalid
                    "attr-value-double-quotes": true, // Force attributes to have double quotes rather than single
                    "attr-value-not-empty": true, // Attribute must set value
                    "doctype-first": true, // Force the DOCTYPE declaration to come first in the document
                    "spec-char-escape": true, // Force special characters to be escaped
                    "id-unique": true, // Prevent using the same ID multiple times in a document
                    // "head-script-disabled": false,    // Prevent script tags being loaded in the head for performance reasons
                    "style-disabled": true, // Prevent style tags. CSS should be loaded through
                    "src-not-empty": true, // src of img(script,link) must set value
                    "img-alt-require": true, // Alt of img tag must be set value
                    "csslint": true, // Scan css with csslint
                    "jshint": true, // Scan script with jshint
                    "force": false // Report HTMLHint errors but don't fail the task
                },
                src: ["index.html"]
            }
        },

        // CSSLint. Tests CSS code quality
        // https://github.com/gruntjs/grunt-contrib-csslint
        csslint: {
            // define the files to lint
            files: ["app/css/main.css"],
            strict: {
                options: {
                    "import": 0,
                    "empty-rules": 0,
                    "display-property-grouping": 0,
                    "shorthand": 0,
                    "font-sizes": 0,
                    "zero-units": 0,
                    "important": 0,
                    "duplicate-properties": 0,
                }
            }
        },

        jshint: {
            files: ["src/app/js/main.js", "Gruntfile.js"],
            options: {
                // strict: true,
                sub: true,
                quotmark: "double",
                trailing: true,
                curly: true,
                eqeqeq: true,
                unused: true,
                scripturl: true, // This option defines globals exposed by the Dojo Toolkit.
                dojo: true, // This option defines globals exposed by the jQuery JavaScript library.
                jquery: true, // Set force to true to report JSHint errors but not fail the task.
                force: true,
                reporter: require("jshint-stylish-ex")
            }
        },

        copy: {
            build: {
                expand: true,
                src: ["**"],
                cwd: "src/",
                dest: "dist/",
            }
        },

        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    "dist/app/css/main.min.css": ["dist/app/css/main.css"],
                    "dist/app/css/normalize.min.css": ["dist/app/css/normalize.css"]
                }
            }
        },

        concat: {
            css: {
                options: {
                    stripBanners: true,
                    banner: "<%= cssBanner %>\n"
                },
                src: ["dist/app/css/normalize.min.css", "dist/app/css/main.min.css"],
                dest: "dist/app/css/main-concat.min.css",
                nonull: true,
            },
            js: {
                options: {
                    stripBanners: true
                },
                src: [
                    "dist/app/js/plugins.js",
                    "dist/app/js/main.js"
                ],
                dest: "dist/app/js/main-concat.js",
                nonull: true,
            },
        },

        clean: {
            build: {
                src: ["dist/"]
            },
            cleancss: {
                src: ["dist/app/css/*.css", "!dist/app/css/concat.min.css"]
            },
            cleanjs: {
                src: ["dist/app/js/*.js", "!dist/app/js/main-concat.min.js"]
            }
        },

        toggleComments: {
            customOptions: {
                options: {
                    removeCommands: false
                },
                files: {
                    "dist/index.html": "src/index.html"
                }
            }
        },

        uglify: {
            options: {
                mangle: true,
                compress: {
                    drop_console: true
                },
                banner: "<%= jsBanner %>\n"
            },
            build: {
                files: {
                    "dist/app/js/main-concat.min.js": ["dist/app/js/main-concat.js"],
                }
            }
        },

        watch: {
            html: {
                files: ["index.html"],
                tasks: ["htmlhint"]
            },
            css: {
                files: ["app/css/main.css"],
                tasks: ["csslint"]
            },
            js: {
                files: ["app/js/main.js"],
                tasks: ["jshint"]
            }
        },

        versioncheck: {
            target: {
                options: {
                    skip: ["semver", "npm", "lodash"],
                    hideUpToDate: false
                }
            }
        },

        replace: {
            update_Meta: {
                src: ["src/index.html", "src/humans.txt", "src/README.md", "src/app/css/main.css", "src/app/js/main.js", "src/Gruntfile.js"], // source files array
                // src: ["README.md"], // source files array
                overwrite: true, // overwrite matched source files
                replacements: [{
                    // html pages
                    from: /(<meta name="revision-date" content=")[0-9]{2}\/[0-9]{2}\/[0-9]{4}(">)/g,
                    to: '<meta name="revision-date" content="' + "<%= pkg.date %>" + '">',
                }, {
                    // html pages
                    from: /(<meta name="version" content=")([0-9]+)(?:\.([0-9]+))(?:\.([0-9]+))(">)/g,
                    to: '<meta name="version" content="' + "<%= pkg.version %>" + '">',
                }, {
                    // humans.txt
                    from: /(Version\: )([0-9]+)(?:\.([0-9]+))(?:\.([0-9]+))/g,
                    to: "Version: " + "<%= pkg.version %>",
                }, {
                    // humans.txt
                    from: /(Last updated\: )[0-9]{2}\/[0-9]{2}\/[0-9]{4}/g,
                    to: "Last updated: " + "<%= pkg.date %>",
                }, {
                    // README.md
                    from: /(### version \| )([0-9]+)(?:\.([0-9]+))(?:\.([0-9]+))/g,
                    to: "### version | " + "<%= pkg.version %>",
                }, {
                    // README.md
                    from: /(#### Updated \| )[0-9]{2}\/[0-9]{2}\/[0-9]{4}/g,
                    to: "#### Updated | " + "<%= pkg.date %>",
                }, {
                    // main.css, main.js, Gruntfile.js
                    from: /(@version )([0-9]+)(?:\.([0-9]+))(?:\.([0-9]+))/g,
                    to: "@version <%= pkg.version %>",
                }]
            }
        }


    });

    // this would be run by typing "grunt test" on the command line
    grunt.registerTask("testjs", ["jshint"]);

    grunt.registerTask("buildcss", ["cssmin", "concat"]);
    grunt.registerTask("concat", ["concat"]);
    grunt.registerTask("buildjs", ["uglify"]);
    grunt.registerTask("check", ["versioncheck"]);

    grunt.registerTask("update", ["replace"]);

    // grunt.registerTask("build", ["replace", "cssmin", "uglify", "concat"]);

    grunt.registerTask("build", ["clean:build", "replace", "copy", "cssmin", "concat", "uglify", "clean:cleancss", "clean:cleanjs", "toggleComments"]);

    // the default task can be run just by typing "grunt" on the command line
    grunt.registerTask("default", []);

};

// ref
// http://coding.smashingmagazine.com/2013/10/29/get-up-running-grunt/
// http://csslint.net/about.html
// http://www.jshint.com/docs/options/
//
// Github Labels
// [Website info](https://medium.com/@dave_lunny/sane-github-labels-c5d2e6004b63)
// [NPM git-labelmaker](https://github.com/himynameisdave/git-labelmaker)
