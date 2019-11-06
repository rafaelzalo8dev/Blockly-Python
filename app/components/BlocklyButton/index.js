import React, {memo} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ArrowBack from '@material-ui/icons/ArrowBack';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import Info from '@material-ui/icons/Info';
import GithubIcon from '@material-ui/icons/GitHub';
import Pause from '@material-ui/icons/PauseCircleOutline';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AssistantIcon from '@material-ui/icons/Assistant';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';

const useStyles = makeStyles(theme => ({
  button: {
    fontFamily: 'Open Sans',
    fontWeight: 'bold',
    margin: theme.spacing(1),
    width: '100%',
    maxWidth: '300px',
    color: 'white',
    background: '#4285f4',
  },
  input: {
    display: 'none',
  },
  icon: {
    marginRight: '10px',
  }
}));

export function BlocklyButton(props) {
  const classes = useStyles();
  const getIcon = () => {
    if(props.icon === 'PersonAdd') {
      return <PersonAddIcon className={classes.icon}/>
    }
    if(props.icon === 'AccountCircle') {
      return <AccountCircle className={classes.icon}/>
    }
    if(props.icon === 'ArrowBack') {
      return <ArrowBack className={classes.icon}/>
    }
    if(props.icon === 'SentimentVerySatisfiedIcon') {
      return <SentimentVerySatisfiedIcon className={classes.icon}/>
    }
    if(props.icon === 'Info') {
      return <Info className={classes.icon}/>
    }
    if(props.icon === 'GitHub') {
      return <GithubIcon className={classes.icon} />
    }
    if(props.icon === 'Pause'){
      return <Pause className={classes.icon} />
    }
    if(props.icon === 'Test'){
      return <AssignmentTurnedInIcon className={classes.icon} />
    }
    if(props.icon === 'Hints'){
      return <AssistantIcon className={classes.icon} />
    }
    if(props.icon === 'Logout'){
      return <ExitToAppIcon className={classes.icon} />
    }
    if(props.icon === 'Start'){
      return <PlayCircleFilledWhiteIcon className={classes.icon} />
    }
  };
  return (
    <div>
      <Button {...props} variant="contained" className={classes.button} startIcon={getIcon()}>
        {props.text}
      </Button>
    </div>
  );
}
BlocklyButton.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.string,
};

export default memo(BlocklyButton);
