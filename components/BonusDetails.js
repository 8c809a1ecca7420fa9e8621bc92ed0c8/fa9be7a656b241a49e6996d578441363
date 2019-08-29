import {Fragment} from "react"
import Typography from "@material-ui/core/Typography"

class BonusDetails extends React.Component {
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
					Bonus
                </Typography>
                <Typography variant="body1" gutterBottom>
                  
                </Typography>
                <Typography variant="h3" gutterBottom>
                    Time of day: {timeOfDay}
                </Typography>
            </Fragment>
        )
    }
}
export default BonusDetails
