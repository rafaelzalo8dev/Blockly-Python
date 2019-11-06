import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import ButtonBlockly from 'components/BlocklyButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
const useStyles = makeStyles(theme => ({
  root: {
    width: '90%',
    minWidth: '500px',
    fontFamily: 'Open Sans'
  },
  button: {
    width: 300,
    margin: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  lbl: {
    fontSize: '16px',
  }
}));

function getSteps() {
  return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
}

function StepperInstructions(props) {
  console.log('propsss ' , props);
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className={classes.root}>

        <Stepper activeStep={activeStep} orientation="vertical">
          {props.data.instructions.map( (label, index) => (
              <Step key={label.text}>
                <StepLabel className={classes.lbl}>{label.text}</StepLabel>
                <StepContent>
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                      {activeStep === props.data.instructions.length -1 &&
                        <ButtonBlockly
                          variant="contained"
                          color="primary"
                          onClick={props.handleClose}
                          className={classes.button}
                          text={'Finish'}
                        />
                      }
                      {
                        activeStep !== props.data.instructions.length - 1 &&
                        <ButtonBlockly
                          variant="contained"
                          color="primary"
                          onClick={handleNext}
                          className={classes.button}
                          text={'Next'}
                        />
                      }
                    </div>
                  </div>
                </StepContent>
              </Step>
            ))}
        </Stepper>
      </div>
    </Dialog>
  );
}

StepperInstructions.propTypes = {
  data: PropTypes.object,
  open: PropTypes.boolean,
  handleClose: PropTypes.func
};

export default memo(StepperInstructions);
