exports.spawnTest = function spawnTest(spawn, log) {
    for (let i = 0; i < 10; i++) {
        log(`${i}: spawning "ls" process`);
        const start = Date.now();
        spawn('ls', ['.']).once('exit', () => {
            log(`${i}: ls exited in ${Date.now() - start} ms`);
        });
        log(`${i}: spawn launched in ${Date.now() - start} ms`);
    }
};
