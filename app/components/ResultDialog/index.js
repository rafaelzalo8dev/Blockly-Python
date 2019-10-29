import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function ResultDialog(props) {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Close
          </Button>
          <Button onClick={props.goToProgress} color="primary">
            Go to menú
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

ResultDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  message: PropTypes.any,
  title: PropTypes.string,
  goToProgress: PropTypes.func,
};

ResultDialog.defaultProps = {
  handleClose: () => console.log('close'),
};

export default memo(ResultDialog);
