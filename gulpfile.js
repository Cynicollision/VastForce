const { series, src, dest } = require('gulp');
const run = require('gulp-run-command').default;
const clean = require('gulp-clean');

async function build(cb) {
    await run(['ng build --prod=true'], { cwd: 'client' })();
    cb();
}

async function cleanPublic(cb) {
    await src('public', { allowEmpty: true }).pipe(clean({ force: true }));
    cb();
}

async function copyPublic(cb) {
    await src('client/dist/VastForceClient/**/*').pipe(dest('public'));
    cb();
}

exports.default = exports.publish = series(cleanPublic, build, copyPublic);
