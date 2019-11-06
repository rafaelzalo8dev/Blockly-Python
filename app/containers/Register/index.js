/**
 *
 * Formulario
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import history from 'utils/history';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectFormulario from './selectors';
import reducer from './reducer';
import TextField from '@material-ui/core/TextField';
import Button from 'components/BlocklyButton';
import { FormContainer, Container } from 'containers/Login/styles';
import Toolbar from 'components/Toolbar';
import Footer from 'components/Footer';
import {post} from 'utils/request';
import {
  apiSuccesAction,
  apiErrorAction,
  loading,
} from 'containers/App/actions';


export function Formulario({ dispatch }) {
  useInjectReducer({ key: 'formulario', reducer });
  const [name, setName] = useState('');
  const [age, setAge] = useState(20);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    localStorage.setItem('nombre', name);
  }, [name]);

  const createUser = () => {
    dispatch(loading());
    post({
      url: '/users',
      body: {
        email,
        password,
        levelId: 1,
        name,
        age: parseInt(age),
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
      console.log('err ', err);
      dispatch(apiErrorAction('Error creating the user'));
    });
  };
  return <React.Fragment>
      <Toolbar />
      <Container>

        <h1>Register and start learning!</h1>
        <FormContainer>
          <TextField
            label="Fullname"
            value={name}
            onChange={e => setName(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Age"
            value={age}
            onChange={e => setAge(e.target.value)}
            margin="normal"
            type="number"
          />
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
        <Button
          icon={'PersonAdd'}
          disabled={!password || !email || !age || !name}
          onClick={() => createUser()} text={"Start Learning!"}
        />
        <Button
          icon={'AccountCircle'}
          onClick={() => history.push('/login')} text={"Already have an account"}
        />
      </Container>
      <Footer />
    </React.Fragment>;
}

Formulario.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  formulario: makeSelectFormulario(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Formulario);
