import React from "react"
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

const steps = ["Task 1", "Task 2", "Bonus", "Task 3", "404"]

function getStepContent(step, taskOptions) {
	switch (step) {
		case 0:
			  return <Task1Details {...taskOptions} />
		case 1:
			  return <Task2Details {...taskOptions} />
		case 2:
        return <BonusDetails {...taskOptions} />
		case 3:
      return <Task3Details {...taskOptions} />
    case 4:
        return <Task3Details {...taskOptions} />
		default:
			throw new Error("Cannot find next step")
	}
}

export default function TaskContainer(taskOptions) {
  const classes = generateMaterialStyles()
  const [activeStep, setActiveStep] = React.useState(0)
  
	const handleNext = () => {
		setActiveStep(activeStep + 1)
	}

	const handleBack = () => {
		setActiveStep(activeStep - 1)
	}

	return (
		<React.Fragment>
        <AppBar
          position="absolute"
          color="default"
          className={classes.appBar}
        >
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Coding Task App
            </Typography>
          </Toolbar>
        </AppBar>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
            
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
            <React.Fragment>
              {activeStep !== steps.length && (
                <React.Fragment>
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
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep < steps.length - 2
                        ? "Next"
                        : "Finish"}
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
	)
}
