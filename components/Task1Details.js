import React, {Fragment} from "react"
import Typography from "@material-ui/core/Typography"
class Task1Details extends React.Component {
    static propTypes() {
        return {
            timeOfDay: React.PropTypes.number.isRequired,
        }
    }
	render() {
        const { timeOfDay } = this.props

        return (
            <Fragment>
                <Typography variant="h6" gutterBottom>
                    Task 1
                </Typography>
                <Typography variant="body1" gutterBottom>
                    The goal of Task 1 is to render a page at the root of the application using SSR (Server Side Rendering)
                    and React. The page should display the time of day. Please note that the time of day is coming
                    from the server, and will only be refreshed when the server renders the page.
                </Typography>
                <Typography variant="h3" gutterBottom>
                    Time of day: {timeOfDay}
                </Typography>
            </Fragment>
        )
    }
}
export default Task1Details