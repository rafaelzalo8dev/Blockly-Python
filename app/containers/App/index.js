/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'redux';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import HomePage from 'containers/HomePage/Loadable';
import Header from 'components/Header';
import Toolbar from 'components/Toolbar';
import Register from 'containers/Register/Loadable';
import Login from 'containers/Login/Loadable';
import TutorView from 'containers/TutorView/Loadable';
import Progreso from 'containers/Progreso/Loadable';
import {
  makeSelectError,
  makeSelectLoading,
  makeSelectShowSnackbar,
  makeSelectMessage,
} from './selectors';
import { closeSnackbar } from './actions';
import GlobalStyle from '../../global-styles';
import SnackBar from 'components/Snackbar';
const AppWrapper = styled.div`
  font-family: 'Open Sans', sans-serif;
`;

import Loader from 'components/Loader';

function App({
  loading,
  error,
  showSnackbar,
  message,
  dispatch,
}) {
  console.log('-------------------------------------------');
  console.log('error ', error);
  console.log('message ', message);
  console.log('showSnackbar ', showSnackbar);
  const closeSnackbar = () => {
    console.log('en el close snackbar');
    dispatch(closeSnackbar());
  };

  return (
    <AppWrapper>
      <Helmet
        titleTemplate="Python Tutor"
        defaultTitle="Tutor de python"
      >
        <meta name="Tutor de python con blockly" content="Tutor de python con blockly" />
      </Helmet>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/progreso" component={Progreso} />
        <Route exact path="/tutor" component={TutorView} />
      </Switch>
      {showSnackbar && (
        <SnackBar text={message} open={showSnackbar} onClose={() => closeSnackbar()}isOK={!error} />
      )}
      {loading && <Loader />}
      <GlobalStyle />
    </AppWrapper>
  );
}
App.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  showSnackbar: PropTypes.bool,
  message: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  showSnackbar: makeSelectShowSnackbar(),
  message: makeSelectMessage(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(App);
