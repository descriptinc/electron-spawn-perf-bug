function testSpawn(log, name, fn) {
    for (let i = 0; i < 2; i++) {
        log(`${i}: spawning "${name}" process`);
        const start = Date.now();
        fn().once('exit', () => {
            log(`${i}: exited in ${Date.now() - start} ms`);
        });
        log(`${i}: spawn launched in ${Date.now() - start} ms`);
    }
}
function testExec(log, name, fn) {
    for (let i = 0; i < 2; i++) {
        log(`${i}: spawning "${name}" process`);
        const start = Date.now();
        fn(() => {
            log(`${i}: exited in ${Date.now() - start} ms`);
        });
        log(`${i}: spawn launched in ${Date.now() - start} ms`);
    }
}

exports.spawnTest = function spawnTest({spawn,exec,execFile}, log) {
    testSpawn(log, 'ls', () => spawn('ls', ['.']));
    testSpawn(log, 'ls detached', () => spawn('ls', ['.'], {detached: true}));
    testSpawn(log, 'ls stdio ignore', () => spawn('ls', ['.'], {stdio: 'ignore'}));
    testSpawn(log, 'ls stdio null', () => spawn('ls', ['.'], {stdio: [null, null, null]}));
    testSpawn(log, 'ls stdio null', () => spawn('ls', ['.'], {stdio: [null, null, null]}));
    testSpawn(log, 'ls no env', () => spawn('ls', ['.'], {env: {}}));
    testSpawn(log, 'ls shell', () => spawn('ls', ['.'], {shell: true}));
    testExec(log, 'ls exec', (callback) => exec('ls', ['.'], callback));
    testExec(log, 'ls execFile', (callback) => execFile('ls', ['.'], callback));
};
