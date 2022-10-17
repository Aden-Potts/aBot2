//
const TYPES = {
    ERROR: ["\x1b[31m", "[ERROR]"],
    WARN: ["\x1b[33m", "[WARNING]"],
    INFO: ["\x1b[36m", "[INFO]"],
    DEBUG: ["\x1b[34m", "[DEBUG]"]
}

export class Logger {
    static Debug(log: string) {
        console.log(TYPES['DEBUG'][0], `${TYPES['DEBUG'][1]}\x1b[37m ${log}`);
    }

    static Info(log: string) {
        console.log(TYPES['INFO'][0], `${TYPES['INFO'][1]}\x1b[37m ${log}`);
    }

    static Warn(log: string) {
        console.log(TYPES['WARN'][0], `${TYPES['WARN'][1]}\x1b[37m ${log}`);
    }

    static Error(log: string) {
        console.log(TYPES['ERROR'][0], `${TYPES['ERROR'][1]}\x1b[37m ${log}`);
    }
}