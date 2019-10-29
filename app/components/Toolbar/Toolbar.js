import React, { useState, useEffect } from "react";
import { StyledContent } from "constants/styles";
import { MainContainer, useStyles, Name} from './styles'
import Badge from "@material-ui/core/Badge";
import PropTypes from 'prop-types';
import history from 'utils/history';
import Button from 'components/BlocklyButton';
import Avatar from '@material-ui/core/Avatar';
const Toolbar = props => {
  const classes = useStyles();
  const [toggleState, setToggleState] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const userStorage = JSON.parse(localStorage.getItem('user'));
    if(userStorage) {
      setUser(userStorage);
    }
  }, []);
  const toggle = () => setToggleState(toggleState === false ? true : false);
  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
    history.push('/');
  };

  const goHome = () => {
    if(user) {
      history.push('/progreso');
    } else {
      history.push('/');
    }
  };

  return (
    <StyledContent>
      <MainContainer dev={props.dev} >
        <div className="logo" onClick={() => goHome()}>
          <img
            className={classes.image}
            src="https://storage.googleapis.com/datank-exam/iconoBlocklyPython.png"
           />
        </div>
        <div className="right">
          {user &&
            <React.Fragment>
              <Avatar alt="Remy Sharp" src="https://storage.googleapis.com/datank-exam/default-user.png" className={classes.avatar} />
              <Name>
                {user ? user.name : ''}
              </Name>
              <Button variant="contained" color="primary" onClick={logOut} text={'Log out'}/>
            </ React.Fragment>
          }
        </div>
      </MainContainer>
    </StyledContent>
  );
};

Toolbar.propTypes={
  user: PropTypes.string,
  dev: PropTypes.bool,
  image: PropTypes.string,
  profile: PropTypes.bool,
  currentCompany: PropTypes.object,
}

Toolbar.defaultProps = {
  user: 'User',
  dev: true,
  image: '',
  profile: true,
  currentCompany: '{{name:empresa}}',
}
export default Toolbar;
