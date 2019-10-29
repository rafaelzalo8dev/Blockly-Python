/**
 *
 * Login
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {post} from 'utils/request';
import {TextField} from '@material-ui/core';
import history from 'utils/history';
import { useInjectSaga } from 'utils/injectSaga';
import saga from './saga';
import Button from 'components/BlocklyButton';
import {  FormContainer, Container} from './styles';
import {
  apiSuccesAction,
  apiErrorAction,
  loading,
} from 'containers/App/actions';
import Footer from 'components/Footer';

export function Login({ dispatch }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
  }, []);
  const login = () => {
    if(email && password) {
      dispatch(loading());
      post({
        url: '/users/login',
        body: {
          email,
          password
        }
      })
      .then(result => {
          if(result && result.id) {
            dispatch(apiSuccesAction());
            localStorage.setItem('user', JSON.stringify(result));
            history.push('/progreso');
          }
      })
      .catch(err => {
        dispatch(apiErrorAction('Wrong Credentials'));
      });
    }
    return;
  };

  return <React.Fragment>
    <Container>
      <h1>Login and keep learning!</h1>
      <FormContainer>
        <TextField
          label="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          margin="normal"
          type="email"
        />
        <TextField
          label="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          margin="normal"
          type="password"
        />
      </FormContainer>
      <Button icon={'AccountCircle'} onClick={() => login()} disabled={!email || !password} text={"Log in"}/>
      <Button icon={'ArrowBack'} onClick={() => history.push('/')} text={"go back"}/>
    </Container>
    <Footer />
    </React.Fragment>;;
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Login);
