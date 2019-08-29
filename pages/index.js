import { Component } from "react"
import { parseCookies } from "nookies"
import Cookie from "js-cookie"
import Router from "next/router"
import moment from "moment"
import TaskContainer from "../components/TaskContainer"
import ErrorPage from './_error'
import { mainStyles } from '../common/styles'

function setTask2Cookie() {
	Cookie.set("sid", "test-session-id")
	Cookie.set("step", 1)
	Router.replace("/") // trigger a server render
}

function setBonusCookie() {
	Cookie.set("sid", "easter-egg")
	Cookie.set("step", 2)
	Router.replace("/") // trigger a server render
}

function setTask3Cookie() {
	Cookie.set("sid", "")
	Cookie.set("step", 3)
	Router.replace("/") // trigger a server render
}

function set401Cookie() {
	Cookie.set("sid", "banned-user")
	Cookie.set("step", 4)
	window.location.href = "/" // force a page refresh (will return a 401 now)
}

class Index extends Component {
	static async getInitialProps(ctx) {
		const initProps = {}

		// get cookies and set the sid we will pass in props
		const cookies = parseCookies(ctx)
		const { sid, step } = cookies
		initProps.sid = sid
		initProps.step = Number.isInteger(step) ? step : 0

		// set the time of day
		initProps.timeOfDay = moment().format("h:mm:ss a")

		// if a cookie is found with banned-user is detected - send a 401
		if(sid === "banned-user") {
			if(ctx.res) ctx.res.statusCode = 401
			initProps.statusCode = 401 // pass this as a prop for our custom error page
		}		

		return initProps // return the props
	}

	render() {
		const { sid, timeOfDay, step } = this.props

		// Options used in each task - to be passed down as props
		const taskOptions = {
			sid,
			timeOfDay,
			step,
			setTask2Cookie: setTask2Cookie,
			setTask3Cookie: setTask3Cookie,
			setBonusCookie: setBonusCookie,
			set401Cookie: set401Cookie,
		}

		var selectedPageStyle = {}
		if(sid === "easter-egg"){
			selectedPageStyle =  mainStyles.upsideDown
		}
		if(sid === "test-session-id"){
			selectedPageStyle = {
				backgroundColor: "#222",
				height: "100%",
				width: "100%"
			}
		}

		if (this.props.statusCode) {
			return <ErrorPage statusCode={this.props.statusCode} message="error!" />
		} else {
			return (
				<div style={selectedPageStyle}>
					<TaskContainer {...taskOptions} />
				</div>
			)
		}
	}
}

export default Index