import { Terminal } from "xterm";
import { FitAddon } from 'xterm-addon-fit';
import { WebglAddon } from "xterm-addon-webgl";
import React, { useEffect } from "react";

const commands: { [key: string]: (term: Terminal, terminalRef: React.MutableRefObject<null>) => void } = {
    ls: (term) => {
        term.writeln(['a', 'bunch', 'of', 'fake', 'files'].join('\r\n'));
    },
    clear: (term) => {
        term.clear();
    },
    date: (term) => {
        term.writeln(new Date().toUTCString());
    },
    help: (term) => {
        term.writeln(["ls      List files", "clear   Clear sceen", "help    Print available commands",
            "date    Print system date and time", "pwd     Print the working directory", "exit    Exit terminal"].join('\r\n'));
    },
    pwd: (term) => {
        term.writeln("/home/mouzourides/Projects/nikmouz.dev");
    },
    exit: (term, terminalRef) => {
        term.dispose();
        if (terminalRef.current) {
            (terminalRef.current as unknown as HTMLElement)?.remove()
        }
    }
};

const baseTheme = {
    foreground: '#F8F8F8',
    background: '#232423',
    selection: '#5DA5D533',
    black: '#1E1E1D',
    brightBlack: '#262625',
    red: '#CE5C5C',
    brightRed: '#FF7272',
    green: '#5BCC5B',
    brightGreen: '#72FF72',
    yellow: '#CCCC5B',
    brightYellow: '#FFFF72',
    blue: '#5D5DD3',
    brightBlue: '#7279FF',
    magenta: '#BC5ED1',
    brightMagenta: '#E572FF',
    cyan: '#5DA5D5',
    brightCyan: '#72F0FF',
    white: '#F8F8F8',
    brightWhite: '#FFFFFF'
};

export function useTerm(terminalRef: React.MutableRefObject<null>) {
    let buffer: string[] = [];
    let position = 0;

    function prompt(term: Terminal) {
        term.write('\r\n$ ');
        buffer = [];
        position = 0;
    }

    function runCommand(term: Terminal) {
        const command = buffer.join("").trim();
        const func = commands[command];

        if (func) {
            term.write('\r\n');
            func(term, terminalRef);
        } else {
            if (buffer.length !== 0) {
                term.writeln("\r\n" + command + ": command not found, run help");
            }
        }
    }

    useEffect(() => {
        const term = new Terminal({
            theme: baseTheme,
            cursorBlink: true,
            fontSize: 16
        });
        const fitAddon = new FitAddon();
        const element = terminalRef.current;

        if (element) {
            term.loadAddon(fitAddon);
            term.open(element);
            term.loadAddon(new WebglAddon());
            fitAddon.fit();
            term.writeln("I'm Nikolas Mouzourides - software developer, hacker, gamer, and sketcher.\n");
            term.writeln("\x1b[3mWelcome to my corner of the web.\x1b[0m");
            prompt(term);
            term.focus();

            term.onData(e => {
                switch (e) {
                    // enter
                    case "\r": {
                        runCommand(term);
                        prompt(term);
                        break;
                    }
                    // backspace
                    case "\u007f": {
                        if (buffer.length !== 0 && position !== 0) {
                            buffer.splice(position - 1, 1);
                            term.write('\x1b[2K\r$ '); // clear line and add $
                            term.write(buffer.join(""));
                            term.write(buffer.slice(position - 1).map(e => "\u001b[D").join("")); // left arrow for buffer size - 1
                            position--;
                        }
                        break;
                    }
                    // left arrow
                    case "\u001b[D": {
                        if (position !== 0) {
                            position--;
                            term.write(e);
                        }
                        break;
                    }
                    // right arrow
                    case "\u001b[C": {
                        if (position !== buffer.length) {
                            position++;
                            term.write(e);
                        }
                        break;
                    }
                    //up and down arrows
                    case "\u001b[B":
                    case "\u001b[A":
                        break;

                    // Control + C
                    case "\u0003": {
                        term.write('^C');
                        prompt(term);
                        break;
                    }

                    default: {
                        buffer.splice(position, 0, e);
                        position++;
                        const input = buffer.slice(position - 1);
                        term.write(input.join(""));
                        term.write(buffer.slice(position).map(e => "\u001b[D").join(""));
                    }
                }
            });
        }
    }, []);
} 