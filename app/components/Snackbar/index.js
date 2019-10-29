import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';


function SnackBar(props) {
  // const getIcon = () => {
  //   // if(props.isOK) {
  //   //   return (<CheckCircleIcon />);
  //   // } else {
  //     return ();
  //   // }
  // }
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={props.open}
        onClose={() => props.handleClose}
        autoHideDuration={3000}
      >
        <SnackbarContent
          message ={
            <span id="message-id">
              <ErrorIcon />
              {props.text}
            </span>}
        />
      </Snackbar>
    </div>
  );
}
SnackBar.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  text: PropTypes.any,
  isOK: PropTypes.bool,
};

SnackBar.defaultProps = {
  handleClose: () => console.log('close'),
};

export default memo(SnackBar);
