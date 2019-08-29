import React, {Fragment} from "react"
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
                    The goal of the bonus task is to flip the page upside down.
                    The bonus task appears before task 3 since task 3 will render an error page
                    after banning the user, and the buck stops there. Call IT :D It's BROKE!
                </Typography>
                <Typography variant="h3" gutterBottom>
                    Time of day: {timeOfDay}
                </Typography>
            </Fragment>
        )
    }
}
export default BonusDetails

