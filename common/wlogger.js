const { createLogger, format, transports } = require("winston"),
	{ combine, timestamp, colorize, json, printf } = format,
	config = require("./config")

const logFormatter = printf(
	info =>
		`${info.timestamp} ${info.level}: ${info.prefix} ${info.stackTrace ||
			info.message.toString()}`
)

class Logger {
	constructor(prefix) {
		this.prefix = prefix
		this.wlogger = createLogger({
			level: config.logLevel || "error",
			transports: [
				new transports.Console({
					format: combine(
						timestamp(),
						json(),
						colorize(),
						logFormatter
					),
				}),
			],
		})
	}

	write(level, ...args) {
		const messages = []
		let stackTrace
		args.forEach(arg => {
			if (arg instanceof Error) {
				stackTrace = arg.stack
				messages.push(arg.toString())
			} else if (typeof arg === "object") {
				try {
					messages.push(JSON.stringify(arg))
				} catch (ignoredErr) {
					// JSON.stringify may complain about circular refs
					messages.push(arg)
				}
			} else {
				messages.push(arg)
			}
		})
		this.wlogger.log({
			level,
			prefix: this.prefix,
			message: messages.join(" "),
			stackTrace,
		})
	}

	debug(...args) {
		this.write("debug", ...args)
	}

	info(...args) {
		this.write("info", ...args)
	}

	warn(...args) {
		this.write("warn", ...args)
	}

	error(...args) {
		this.write("error", ...args)
	}
}

module.exports = prefix => new Logger(prefix)

const myLogger = new Logger("[wlogger]")
// Log current log level
setImmediate(() => {
	if (config.logLevel) {
		myLogger.debug(`Current log level is ${config.logLevel}`)
	} else {
		myLogger.info("No log level set; using default log level 'error'")
	}
})

// Handle uncaught exceptions and unhandled Promise rejections
process.on("uncaughtException", err => {
	myLogger.error("UNCAUGHT EXCEPTION", err)
	setTimeout(() => process.exit(1), 1000)
})
process.on("unhandledRejection", reason => {
	myLogger.error("UNHANDLED REJECTION", reason)
	setTimeout(() => process.exit(1), 1000)
})
