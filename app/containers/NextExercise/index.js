/**
 *
 * NextExercise
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import history from 'utils/history';
export function NextExercise({dispatch, location}) {
  useEffect(() => {
    const exerciseProp = location ? location.exercise : null;
    history.push({
      pathname: '/tutor',
      exercise: exerciseProp
    });
  }, []);
  return <div />;
}

NextExercise.propTypes = {
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

export default compose(withConnect)(NextExercise);
