import { Component } from "react"
import TaskContainer from "../components/TaskContainer"
import moment from "moment"

class Index extends Component {
  static async getInitialProps(ctx) {
		const initProps = {}

		// set the time of day
		initProps.timeOfDay = moment().format("h:mm:ss a")

		return initProps // return the props
	}
	render() {
    return (
      <TaskContainer {...this.props} />
    )
	}
}

export default Index