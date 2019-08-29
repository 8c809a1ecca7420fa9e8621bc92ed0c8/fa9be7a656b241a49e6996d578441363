const express = require("express"),
	nextjs = require("next"),
	compression = require("compression"),
	timeout = require("connect-timeout"),
	morgan = require("morgan"),
	wlogger = require("./wlogger")("[server]")

const isProd = process.env.NODE_ENV === "production"
const nextApp = nextjs({ dev: !isProd })
const handle = nextApp.getRequestHandler()

const PORT = process.env.PORT || 3000

nextApp
	.prepare()
	.then(() => {
		const server = express()

		// Trust proxy headers
		if (server.get("env") === "prod") {
			server.proxy = true
		}

		// Add middleware
		server.use(timeout(15 * 1000))
		server.use(morgan("common"))
		server.use(compression())

		// CORS middleware
		server.use((req, res, next) => {
			const origin = req.get("origin")
			const allowOrigin = origin === "http://localhost:3000"
			if (allowOrigin) {
				res.set({
					"Access-Control-Allow-Origin": origin,
					// Required for cookies, authorization headers with HTTPS
					"Access-Control-Allow-Credentials": true,
					"Access-Control-Allow-Headers": [
						"Authorization",
						"Content-Type",
					],
					"Access-Control-Max-Age": 60 * 60 * 24, // Cache
				})
			}
			next()
		})

		server.get("*", (req, res) => {
			return handle(req, res)
		})

		// Kick the tires and light the fires == start the server
		server.listen(PORT, err => {
			if (err) {
				wlogger.error(err)
				throw err
			} else {
				wlogger.info(`Server listening on port ${PORT}`)
			}
			if (typeof process.getuid === "function") {
				// Drop permissions
				if (process.getuid() === 0) {
					process.setgid("www-data")
					process.setuid("www-data")
					wlogger.info("Dropped root permissions")
				}
			}
		})
	})
	.catch(err => {
		wlogger.error("Error caught from NextJS", err)
		process.exit(1)
	})
