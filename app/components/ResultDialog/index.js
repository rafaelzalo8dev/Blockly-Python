import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/BlocklyButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from './styledComponents';

const useStyles = makeStyles(() => ({
  buttonContainer: {
  },
  title: {
    fontFamily: 'Open Sans',
    fontSize: 24,
    padding: '40px 40px 0 30px',
  },
  text: {
    fontFamily: 'Open Sans',
    fontSize: 20,
  },
}));

function ResultDialog(props) {
  const classes = useStyles();
  return (
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
      <Container>
        <DialogTitle className={classes.title} id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.text}>
            {props.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.buttonContainer}>
          <Button onClick={props.leftAction} text={props.leftActionText} color="primary" />
          <Button onClick={props.goToProgress} text={props.rightActionText} color="primary" />
        </DialogActions>
      </Container>
    </Dialog>
  );
}

ResultDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  message: PropTypes.string,
  title: PropTypes.string,
  goToProgress: PropTypes.func,
  rightActionText: PropTypes.string,
  leftActionText: PropTypes.string,
};

ResultDialog.defaultProps = {
  handleClose: () => console.log('close'),
  rightActionText: 'rafa',
  leftActionText: 'rafa2',
  message: '<div>rrafaa</div>'
};

export default memo(ResultDialog);
