const express = require("express"),
	nextjs = require("next"),
	wlogger = require("./wlogger")("[server]")

const isProd = process.env.NODE_ENV === "production"
const nextApp = nextjs({ dev: !isProd })
const handle = nextApp.getRequestHandler()

const PORT = process.env.PORT || 3000

nextApp
	.prepare()
	.then(() => {
		const server = express()

		server.get("*", (req, res) => {
			return handle(req, res)
		})

		server.listen(PORT, err => {
			if (err) {
				wlogger.error(err)
				throw err
			}
			wlogger.info(`Server listening on port ${PORT}`)
		})
	})
	.catch(err => {
		wlogger.error("Error caught from NextJS", err)
		process.exit(1)
	})
