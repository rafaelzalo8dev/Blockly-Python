import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/BlocklyButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { Console, ConsoleText }  from './styledComponents';
import Sk from 'skulpt';

const useStyles = makeStyles(theme => ({
  root: {
    width: '90%',
    minWidth: '600px',
    fontFamily: 'Open Sans'
  },
  buttonContainer: {
    margin: theme.spacing(1),
  },
  title: {
    fontFamily: 'Open Sans',
    fontSize: 24,
    padding: '40px 40px 0 30px',
  },
  text: {
    fontFamily: 'Open Sans',
    fontSize: 20,
    padding: theme.spacing(1),
  },
}));

function SkulptConsole(props) {
  const [outputR, setOutputR] = useState([]);
  let code = props.code;
  Sk.pre = "output";
  function builtinRead(x) {
      if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
              throw "File not found: '" + x + "'";
      return Sk.builtinFiles["files"][x];
  }
  let currentOutput = [];
  Sk.configure({
    output:function(res){
      if(res.trim() !== ''){
        currentOutput.push(res);
      }
    }, read:builtinRead
  });
  var myPromise = Sk.misceval.asyncToPromise(function() {
      return Sk.importMainWithBody("<stdin>", false, code);
  });
  myPromise.then(async function(mod) {
  },function(err) {
      console.log(err);
  });
  const classes = useStyles();

  return (
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
      <div className={classes.root}>

        <DialogTitle className={classes.title} id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
            <Console>
                {currentOutput.map((out) => {
                  return (<div>>{out}</div>)
                })}
            </Console>
        </DialogContent>
        <DialogActions className={classes.buttonContainer}>
          <Button onClick={props.handleClose} text={'Close'} color="primary" />
          <Button onClick={props.testCode} text={'Test'} icon={'Test'} color="primary" />
        </DialogActions>
      </div>

    </Dialog>
  );
}

SkulptConsole.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  code: PropTypes.string,
  title: PropTypes.string,
  goToProgress: PropTypes.func,
  testCode: PropTypes.func,
};

export default memo(SkulptConsole);
