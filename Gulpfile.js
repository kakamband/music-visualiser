/* 
Gulp is streaming (input ouput ) task runner that lets developers automate many development tasks. 
At a high level, gulp reads files as streams and pipes the streams to different tasks. 
These tasks are code-based and use plugins. 
The tasks modify the files, building source files into production files. 

Tools like Gulp are often referred to as “build tools” because they are tools for running the tasks for building a website. The two most popular build tools out there right now are Gulp and Grunt. 

*/

// ---------------------------------------------------------------------------------------------------------------------
const gulp  = require("gulp");
const child_proc   = require("child_process"); /* The child_process module provides the ability to spawn child processes in a manner that is similar, but not identical, to popen(3). i.e. this allows you to basically "fork" a process */
// const exec  = cp.exec;
const del   = require("del");



/* Folder destinations */
const SRC_FOLD = "./src/server";
const TEST_FOLD = "./test";
const DIST_FOLD  = "./dist";
const ROOT_FOLD  = "./";
const JS_DOC_FOLD = "./JsDocs";



/* path clean up */

const DistPath = (aPath = "") => {
    return DIST_FOLD + aPath;
};
const Dist = (path = "" ) => {
    return gulp.src(DistPath(path));
}

const RootPath = (aPath = "") => {
    return ROOT_FOLD + aPath;
};
const Root = (aPath = "") => {
    return gulp.src(RootPath(aPath));
};


const SrcPath = (path = "")=> {
    return SRC_FOLD + path;
}
const TestPath = (path = "")=> {
    return TEST_FOLD + path;
}


//-----------------------------------------------------------------------
/* create and initalize folders */
/**
*   @param {string} file - file refers to C style of file defintions (i.e. pipes, directories, folders)
*   @return {GulpVinyl}
*/

const createFile = (file = "") => {
    return gulp.dest(file);
} 

gulp.task('init-folder', () =>{
    return gulp.src('*.*', {read: false})
    .pipe(createFile(SrcPath()))
    .pipe(createFile(TestPath()))
    .pipe(createFile(SrcPath('/Config')))
    .pipe(createFile(SrcPath('/Env')))
    .pipe(createFile(SrcPath('/Dist')));
});

gulp.task('init-tslint', (done) => {
    child_proc.exec(`tslint --init`, {maxBuffer: 1024 * 1024000}, (error, sout, serr) => {
        serr && console.error(serr);
        }).stdout.pipe(process.stdout);
    
        process.on("SIGINT", () => { /* i.e. sigaction */
            console.log("SIGINT triggered.\n*** Maybe shown twice because it exits both gulp child_process and the app***");
            // This traps SIGINT inside the exec and does not cause it to call process.exit(),
            // but instead calls process.exit(1) on App.ts
        });
    done();   
});

gulp.task('init', gulp.series(
    'init-folder',
    'init-tslint'
));



/* clean and build gulp tasks */
gulp.task("clean_dist", done => {
    del([DistPath("**/*")], { force: true }).then((res) =>{
        process.stdout.write(`The dist folder has been deleted! ${res} \n`);
    }).then((err) => {
        process.stdout.write(`Error in cleaning the dist folder! ${err} \n`);
    });
    done();
}); /* This code defines a clean task that can be executed by running the following from the command line: gulp clean */



gulp.task(`clean_other`, gulp.parallel(
    (done) => { del([RootPath('JsDocs')], {force: true}).then((res) =>{
        process.stdout.write(`The jsDocs folder has been deleted! ${res} \n`);
    }).then((err) => {
        process.stdout.write(`Error in cleaning the jsDocs folder! ${err} \n`);
    }) 
    done();
    },
));

/* note must be placed here */
gulp.task('clean', gulp.series( 
    "clean_dist", 
    "clean_other"
));




/* compile and run project */
gulp.task("start", (done) => {
    child_proc.exec(`npm run start-auto`, {maxBuffer: 1024 * 1024000}, (error, sout, serr) => {
    serr && console.error(serr);
    }).stdout.pipe(process.stdout);

    process.on("SIGINT", () => { /* i.e. sigaction */
        console.log("SIGINT triggered.\n*** Maybe shown twice because it exits both gulp child_process and the app***");
        // This traps SIGINT inside the exec and does not cause it to call process.exit(),
        // but instead calls process.exit(1) on App.ts
        process.exit(0);
    });
    done();
});  


gulp.task('build', gulp.series(
    'clean',
    'start'
));



/* JSDoc - provides a premade documentation of your project. Nice to use for project management
    Example: jsdoc ./dist -r -d docs
    generate documentation from the ./dist folder and all of its subdirectories and place that output into the docs folder
*/
gulp.task(`jsdoc`, (done) => {
    child_proc.exec(`jsdoc ${DistPath()} -r -d ${RootPath(JS_DOC_FOLD)}`, {maxBuffer: 1024 * 1024000}, (error, sout, serr) => {
        serr && console.error(serr);
    }).stdout.pipe(process.stdout); /* pipes it to stdout */
    done();
});



/*------------------------------------------------- Testing tasks ----------------------------------------------------------*/
/*AVA */
/* for AVA */
const _AVA_ = `node ./node_modules/ava/cli.js --verbose`;
let _TestCommand_ = _AVA_; /* AVA is a testing framework */


/** If error exists, exit the process with failure status/code
 * 
 * @param {String} error - Error text to pass
 */
const ProcessExitCode1 = (error = null) => {
    if (error)
    {
        console.error(`exec error: ${error}`);
        process.exit(1);
    }
};


/**----------------------------------------------------------------------------------------------------------------------
* Runs all test gulp tasks with specific command
*
* @param {object} done
* @param {string} command - command to run the series of tasks
* @return {object}  - the return of gulp series function
*/
const runAllTestGulpTasks = (done, command) => {
    _TestCommand_ = command;
    return (gulp.series(
        "ava",
    ))(done);
};

/**----------------------------------------------------------------------------------------------------------------------
* Executes test, throws error when test fails
*
* @param {object} done
* @param {string} testPath - path to the test files
*/
const execTests = (done, testPath) => {
    const avaTestPath = (testPath instanceof Array) ?
        testPath.map((aPath) => testPath.reduce((aPath, aCurrent) => aPath += ` ${aCurrent}`)) : /*if we gave an array */
        testPath;

    child_proc.exec(`${_TestCommand_} ${avaTestPath}`, {}, (error, sout, serr) => {
        serr && console.error(serr);
        ProcessExitCode1(error);
        done(error);
    }).stdout.pipe(process.stdout);
    done();
};




gulp.task("ava", done => {
    execTests(done, `./dist/test/**`);
});














