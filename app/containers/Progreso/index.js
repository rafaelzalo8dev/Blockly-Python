/**
 *
 * Progreso
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import history from 'utils/history';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Button} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import {
  Container
} from './styledComponents';

const useStyles = makeStyles(theme => ({
  root: {
   width: '100%',
   padding: 30,
   overflowX: 'auto',
 },
 table: {
   minWidth: '100%',
 },
}));

export function Progreso() {
  const classes = useStyles();
  const [topics, setTopics] = useState([{
    name: 'Tema1',
    exercises: [{
      topic: 'Maths',
      description: 'Enable some math calcs',
      instructions: [
        'Create a variable called base.',
        'Set value to the base variable as : 20.',
        'Create a variable called height.',
        'Set value to the base variable as : 5.',
        'Use the area form:  (base * height)/2.',
        'Print the area for the result.',
        'Your result might be: 50.'
      ],
      name: 'Calculate the area of a triangle.',
      hints: [
        'To create a variable you have to access to the Variables category and choose Create Variable.',
        'To create some calcs you have to access to the Math category and choose a block for math operations.',
        'To perform print functions you need to access to the Text category and select Print.'
      ],
      solutions: [["rafa = None", "rafa = 'rafa1231'", "print(rafa)"]],
      estimatedTime: 500,
      complexity: 4,
      bestCalification: 4
    },{
      topic: 'Maths',
      description: 'Enable some math calcs',
      instructions: [
        'Create a variable called base.',
        'Set value to the base variable as : 20.',
        'Create a variable called height.',
        'Set value to the base variable as : 5.',
        'Use the area form:  (base * height)/2.',
        'Print the area for the result.',
        'Your result might be: 50.'
      ],
      name: 'Calculate the area of a triangle.',
      hints: [
        'To create a variable you have to access to the Variables category and choose Create Variable.',
        'To create some calcs you have to access to the Math category and choose a block for math operations.',
        'To perform print functions you need to access to the Text category and select Print.'
      ],
      solutions: [["rafa = None", "rafa = 'rafa1231'", "print(rafa)"]],
      estimatedTime: 500,
      complexity: 4,
    },{
      topic: 'Maths',
      description: 'Enable some math calcs',
      instructions: [
        'Create a variable called base.',
        'Set value to the base variable as : 20.',
        'Create a variable called height.',
        'Set value to the base variable as : 5.',
        'Use the area form:  (base * height)/2.',
        'Print the area for the result.',
        'Your result might be: 50.'
      ],
      name: 'Calculate the area of a triangle.',
      hints: [
        'To create a variable you have to access to the Variables category and choose Create Variable.',
        'To create some calcs you have to access to the Math category and choose a block for math operations.',
        'To perform print functions you need to access to the Text category and select Print.'
      ],
      solutions: [["rafa = None", "rafa = 'rafa1231'", "print(rafa)"]],
      estimatedTime: 500,
      bestCalification: 2,
      complexity: 4,
    },{
      topic: 'Maths',
      description: 'Enable some math calcs',
      instructions: [
        'Create a variable called base.',
        'Set value to the base variable as : 20.',
        'Create a variable called height.',
        'Set value to the base variable as : 5.',
        'Use the area form:  (base * height)/2.',
        'Print the area for the result.',
        'Your result might be: 50.'
      ],
      name: 'Calculate the area of a triangle.',
      hints: [
        'To create a variable you have to access to the Variables category and choose Create Variable.',
        'To create some calcs you have to access to the Math category and choose a block for math operations.',
        'To perform print functions you need to access to the Text category and select Print.'
      ],
      solutions: [["rafa = None", "rafa = 'rafa1231'", "print(rafa)"]],
      estimatedTime: 500,
      complexity: 4,
      bestCalification: 4
    }],
  }, {
    name: 'Tema2',
    exercises: [{
      name: 'Ejercicio2',
      description: 'De que se trata el ejercicio2',
      bestCalification: 5,
      complexity: 5,
      estimatedTime: 600,
    }]
  }]);
  const [selectedTopic, setSelectedTopic] = useState({});

  useEffect(() => {
    setSelectedTopic(topics[0]);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const start = (rowSelected) => {
    history.push({
      pathname: '/tutor',
      exercise: rowSelected
    });
  }

  return (
    <Container>
      <Paper className={classes.root}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Complexity</TableCell>
              <TableCell align="center">Estimated Time</TableCell>
              <TableCell align="center">Best Calification</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedTopic && selectedTopic.exercises && selectedTopic.exercises.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{row.complexity}</TableCell>
                <TableCell align="center">{row.estimatedTime} seconds</TableCell>
                <TableCell align="center">{row.bestCalification} stars</TableCell>
                <TableCell align="center">
                  <Button variant="contained" color="primary" onClick={() => start(row)}>Try Now!</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>);
}

Progreso.propTypes = {
  dispatch: PropTypes.func,
};

Progreso.propTypes = {
  dispatch: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default compose(
  memo,
)(Progreso);
