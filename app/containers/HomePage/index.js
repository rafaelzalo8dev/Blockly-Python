import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Button from 'components/BlocklyButton';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectHomePage,
} from 'containers/HomePage/selectors';
import ContentDefault from 'utils/content';
import Typography from '@material-ui/core/Typography';
import {FullPageContainer, Container, TextContainer, Title, SectionContainer, MidWidth } from './styledComponents';
import Toolbar from 'components/Toolbar';
import Footer from 'components/Footer';
import history from 'utils/history';
const key = 'home';
import config from 'config';
export function HomePage(props) {
  useEffect(() => {
    // const userStorage = JSON.parse(localStorage.getItem('user'));
    // if(userStorage) {
    //   props.history.push('/progreso');
    // }
  }, []);

  return (
    <article>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="Python"
          content="Mi tutor de python"
        />
      </Helmet>
      <div>
        <Toolbar />
        <FullPageContainer>
          <Title>Learn to program in Python with blocks</Title>
          <img
            styles={{maxWidth: '500px', width: '100%', marginBottom: '500px !important'}}
            src="https://storage.googleapis.com/datank-exam/inicio.png"
          />
          <Button icon={'AccountCircle'} onClick={() => history.push('/login')} text={'Sign in'}></Button>
          <Button icon={'PersonAdd'} onClick={() => history.push('/register')} text={'Sign up'}></Button>

        </FullPageContainer>
        <SectionContainer>
          <MidWidth>
            <Title>What is Blockly?</Title>
            <TextContainer>
              Blockly is a visual coding language that allows users to create
              codes by stacking <b>blocks</b> together. These blocks are used to create
              <b> chunks of code</b> that can later be translated into professional
              textual code.
            </TextContainer>
            <Button icon={'Info'} onClick={() => history.push('https://developers.google.com/blockly')} text={'More info about blockly'}></Button>
          </MidWidth>
          <MidWidth>
            <img
              styles={{maxWidth: '500px', width: '100%'}}
              src="https://storage.googleapis.com/datank-exam/blocklyeditor.png"
            />
          </MidWidth>
        </SectionContainer>
        <SectionContainer>
          <MidWidth>
            <img
              styles={{maxWidth: '500px', width: '100%'}}
              src="https://storage.googleapis.com/datank-exam/ejercicios.png"
            />
          </MidWidth>
          <MidWidth>
            <Title>Learn any day.</Title>
            <TextContainer>
              We have a <b>lot of exercises</b> with topics to help in the learning
              of code with the powerful language of <b>Python</b>.
              <br/>
              Also we log your progress in those acivities and save your better
              performances by each exercise.
            </TextContainer>
            <Button icon={'SentimentVerySatisfiedIcon'} onClick={() => history.push('/register')} text={'Start now'}></Button>
          </MidWidth>
        </SectionContainer>
        <SectionContainer>
          <MidWidth>
            <Title>How we qualify your exercises.</Title>
            <TextContainer>
              Use <b>fuzzy logic</b> to classify them.<br/>
              We consider the <b>time</b> it takes to perform the exercise, the amount of <b>hints</b> you needed as well as the <b>complexity</b> of it.
            </TextContainer>
            <Button icon={'SentimentVerySatisfiedIcon'} onClick={() => history.push('/register')} text={'Start now'}></Button>
          </MidWidth>
          <MidWidth>
            <img
              styles={{maxWidth: '500px', width: '100%'}}
              src="https://storage.googleapis.com/datank-exam/FUZZY.png"
            />
          </MidWidth>
        </SectionContainer>
      </div>
      <Footer />
    </article>
  );
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
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
)(HomePage);
