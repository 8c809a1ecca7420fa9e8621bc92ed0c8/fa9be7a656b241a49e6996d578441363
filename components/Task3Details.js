import React, {Fragment} from "react"
import Typography from "@material-ui/core/Typography"

class Task3Details extends React.Component {
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
                    Task 3
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Task 3 - the final task is to ban a user by setting a cookie (“sid: banned-user”), and send a 401
                    status code. When this cookie is in place we will send the user to a page displaying the message: "You have been banned".
                    Click finish to set the cookie. Thanks for playing!
                </Typography>
                <Typography variant="h3" gutterBottom>
                    Time of day: {timeOfDay}
                </Typography>
            </Fragment>
        )
    }
}
export default Task3Details
