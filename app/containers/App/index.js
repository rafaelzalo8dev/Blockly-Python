/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Toolbar from 'components/Toolbar';
import Formulario from 'containers/Formulario/Loadable';
import TutorView from 'containers/TutorView/Loadable';

import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="Python Tutor"
        defaultTitle="Tutor de python"
      >
        <meta name="Tutor de python con blockly" content="Tutor de python con blockly" />
      </Helmet>
      <Toolbar currentCompany={{name: 'Rafa'}} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/formulario" component={Formulario} />
        <Route exact path="/tutor" component={TutorView} />
      </Switch>
      <GlobalStyle />
    </AppWrapper>
  );
}
