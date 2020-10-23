# electron-spawn-bug

We've noticed a bug in macOS 11 (Big Sur) where calling `require('child_process').spawn(…)` is much slower when called in a code-signed app.

Tested (and reproducible) in Electron 10.1.3, 10.1.4, and 11.0.0-beta.13. Does not seem to be computer-specific and does not affect macOS 10.15 (Catalina).

This affects the main process (2-4ms to 8-10ms), but is especially noticeable in the renderer process since the entire UI freezes (from 1-4ms up to 500-3000ms on a MacBook Pro). 

## Code-signed Package Version

You need an Apple Developer code-signing certificate installed to reproduce this bug.

```bash
yarn install
yarn build
dist/mac/electron-spawn-bug.app/Contents/MacOS/electron-spawn-bug
```

### Main process console output

`spawn` is fairly fast when run from the main script.

```
$ dist/mac/electron-spawn-bug.app/Contents/MacOS/electron-spawn-bug 
0: spawning "ls" process
0: spawn launched in 10 ms
1: spawning "ls" process
1: spawn launched in 9 ms
...
7: ls exited in 360 ms
8: ls exited in 358 ms
9: ls exited in 355 ms
```

### Renderer output

`spawn` is synchronously slow (~400ms) when run from the renderer app. 

Note: the entire UI freezes for ~4 seconds before this prints out

```
0: spawning "ls" process
0: spawn launched in 422 ms
1: spawning "ls" process
1: spawn launched in 466 ms
2: spawning "ls" process
2: spawn launched in 395 ms
...

5: ls exited in 2135 ms
6: ls exited in 1735 ms
7: ls exited in 1329 ms
8: ls exited in 873 ms
9: ls exited in 456 ms
```

# Build non-code-signed version (works fine)

If you run the unpackaged app from command-line (`yarn start`) or build it without code-signing, it's fast.

```bash
yarn install
yarn build-no-sign
dist/mac/electron-spawn-bug.app/Contents/MacOS/electron-spawn-bug
```

### Main process console output

```
$ dist/mac/electron-spawn-bug.app/Contents/MacOS/electron-spawn-bug 
0: spawning "ls" process
0: spawn launched in 4 ms
1: spawning "ls" process
1: spawn launched in 2 ms
2: spawning "ls" process
2: spawn launched in 3 ms
3: spawning "ls" process
3: spawn launched in 3 ms
...
5: ls exited in 251 ms
6: ls exited in 249 ms
7: ls exited in 247 ms
8: ls exited in 244 ms
9: ls exited in 243 ms
```

### Renderer output

```
0: spawning "ls" process
0: spawn launched in 4 ms
1: spawning "ls" process
1: spawn launched in 1 ms
2: spawning "ls" process
2: spawn launched in 2 ms
3: spawning "ls" process
3: spawn launched in 2 ms
...
6: ls exited in 27 ms
7: ls exited in 26 ms
8: ls exited in 25 ms
9: ls exited in 24 ms
```

## License

[CC0 1.0 (Public Domain)](LICENSE.md)
