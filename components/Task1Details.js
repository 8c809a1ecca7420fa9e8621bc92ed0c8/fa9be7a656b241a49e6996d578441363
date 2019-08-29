import {Fragment} from "react"
import Typography from "@material-ui/core/Typography"
 
class Task1Details extends React.Component {
	render() {
        return (
            <Fragment>
                <Typography variant="h6" gutterBottom>
                    Task 1
                </Typography>
                <Typography variant="body1" gutterBottom>

                </Typography>
                <Typography variant="h3" gutterBottom>
                    Time of day:
                </Typography>
            </Fragment>
        )
    }
}
export default Task1Details