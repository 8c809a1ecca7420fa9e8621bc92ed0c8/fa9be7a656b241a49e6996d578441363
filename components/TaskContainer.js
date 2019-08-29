import React, {Fragment} from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Paper from "@material-ui/core/Paper"
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Task1Details from "./Task1Details"
import Task2Details from "./Task2Details"
import Task3Details from "./Task3Details"
import BonusDetails from "./BonusDetails"
import { generateMaterialStyles } from "../common/styles"

const steps = ["Task 1", "Task 2", "Bonus", "Task 3"]

function getStepContent(step, taskOptions) {
	switch (step) {
		case 0:
			  return <Task1Details {...taskOptions} />
		case 1:
        if(taskOptions.sid !== "test-session-id"){
            taskOptions.setTask2Cookie()
        }
			  return <Task2Details  {...taskOptions} />
		case 2:
        if(taskOptions.sid !== "easter-egg"){
          taskOptions.setBonusCookie()
        }
        return <BonusDetails  {...taskOptions} />
		case 3:
        if(taskOptions.sid !== ""){
          taskOptions.setTask3Cookie()
        }
      return <Task3Details  {...taskOptions} />
		default:
			throw new Error("Cannot find next step")
	}
}

export default function TaskContainer(taskOptions) {
  const { sid, step } = taskOptions
	const classes = generateMaterialStyles()
  const [activeStep, setActiveStep] = React.useState(step)
  
	const handleNext = () => {
		setActiveStep(activeStep + 1)
	}

	const handleBack = () => {
		setActiveStep(activeStep - 1)
  }
  
  const handleFinish = () => {
		taskOptions.set401Cookie()
	}

	return (
		<Fragment>
        <AppBar
          position="absolute"
          color="default"
          className={classes.appBar}
        >
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Coding Task App {sid && `- SID: ${sid}`}
            </Typography>
          </Toolbar>
        </AppBar>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
            {sid === "test-session-id" ? <p>Welcome Admin</p> : "Coding Tasks"}
            </Typography>
            <Stepper
              activeStep={activeStep}
              className={classes.stepper}
            >
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Fragment>
              {activeStep !== steps.length && (
                <Fragment>
                  {getStepContent(activeStep, taskOptions)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button
                        onClick={handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                    )}
                    {activeStep < steps.length - 1 &&
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      Next
                    </Button>}
                    {activeStep > steps.length -2 &&
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleFinish}
                      className={classes.button}
                    >
                      Finish
                    </Button>}
                  </div>
                </Fragment>
              )}
            </Fragment>
          </Paper>
        </main>
      </Fragment>
	)
}
