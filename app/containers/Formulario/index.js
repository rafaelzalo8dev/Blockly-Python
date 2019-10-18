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

export function Formulario() {
  useInjectReducer({ key: 'formulario', reducer });
  const [name, setName] = useState('');
  useEffect(() => {
    localStorage.setItem('nombre', name);
  }, [name]);
  return <div>
    <h1>FORMULARIO</h1>
    <TextField
      label="Nombre"
      value={name}
      onChange={e => setName(e.target.value)}
      margin="normal"
    />
    <h1 onClick={() => history.push('/tutor')}>IR AL TUTOR</h1>
  </div>;
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
