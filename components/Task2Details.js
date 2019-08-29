import React, {Fragment} from "react"
import Typography from "@material-ui/core/Typography"

class Task2Details extends React.Component {
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
                    Task 2
                </Typography>
                <Typography variant="body1" gutterBottom>
                    The goals of Task 2 are to render the time of day, add a cookie (“sid: test-session-id”)
                    to the users browser, and have a different color theme from Task 1.
                    If you are seeing an sid in the header, then the cookie was successfully added.
                    If the cookie (“sid: test-session-id”) is in your browser, then a message will be displayed
                    in the title area of this card titled: Welcome Admin.
                </Typography>
                <Typography variant="h3" gutterBottom>
                    Time of day: {timeOfDay}
                </Typography>
            </Fragment>
        )
    }
}
export default Task2Details
