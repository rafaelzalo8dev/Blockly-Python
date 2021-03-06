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
import clsx from 'clsx';

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from 'components/BlocklyButton';
import AppBar from '@material-ui/core/AppBar';
import TopicCard from 'components/TopicCard';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import {
  Container,
  CardContainer,
  CardsContainer,
} from './styledComponents';
import ItemsCarousel from 'react-items-carousel';
import Toolbar from 'components/Toolbar';
import {
  apiSuccesAction,
  apiErrorAction,
  loading,
} from 'containers/App/actions';
import {get} from 'utils/request';

const useStyles = makeStyles(theme => ({
  root: {
   width: '100%',
   padding: 30,
   marginTop: '40px',
 },
 table: {
   minWidth: '100%',
 },
 card: {
   maxWidth: 360,
   minWidth: 300,
 },
 media: {
   height: 0,
   paddingTop: '56.25%', // 16:9
 },
 expand: {
   transform: 'rotate(270deg)',
   background: '#4285f4',
   position: 'absolute',
   right: '4px',
   marginLeft: 'auto',
   transition: theme.transitions.create('transform', {
     duration: theme.transitions.duration.shortest,
   }),
 },
 expandLeft: {
   transform: 'rotate(90deg)',
   position: 'absolute',
   left: '4px',
   background: '#4285f4',
   marginLeft: 'auto',
   transition: theme.transitions.create('transform', {
     duration: theme.transitions.duration.shortest,
   }),
 },
 avatar: {
   backgroundColor: 'black',
 },
}));

export function Progreso({ dispatch }) {
  const classes = useStyles();
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  useEffect(() => {
    dispatch(loading());
    const filter = {
      filter: {
      include: {
        relation: 'exercises'
      }
    }
    };
    get({
      url: `/topics/getTopicsInfo?userId=${JSON.parse(localStorage.getItem('user')).id}`
    })
    .then(result => {
        dispatch(apiSuccesAction());
        setTopics(result);
    })
    .catch(err => {
      dispatch(apiErrorAction('Error fetching topics'));
    });
  }, []);

  const start = (rowSelected, idx) => {
    history.push({
      pathname: '/tutor',
      exercise: rowSelected.id,
      index: idx,
      nextExercise: selectedTopic.exercises.length - 1 !== idx ? selectedTopic.exercises[idx + 1].id : null,
      isLastExercise: selectedTopic.exercises.length - 1 == idx,
    });
  };

  const changeActiveItem = (item) => {
    setActiveItemIndex(item);
  };

  return (
    <React.Fragment>
    <Toolbar />

    <Container>
      <ItemsCarousel
        // Placeholder configurations
        enablePlaceholder
        numberOfPlaceholderItems={0}
        minimumPlaceholderTime={1000}
        placeholderItem={<div style={{ height: 200, background: '#900' }}>Placeholder</div>}

        // Carousel configurations
        numberOfCards={3}
        gutter={12}
        showSlither={true}
        firstAndLastGutter={true}
        freeScrolling={false}

        // Active item configurations
        requestToChangeActive={changeActiveItem}
        activeItemIndex={activeItemIndex}
        activePosition={'center'}

        chevronWidth={24}
        rightChevron={
          <IconButton
            className={classes.expand}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        }
        leftChevron={
          <IconButton
          className={classes.expandLeft}
          aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        }
        outsideChevron={false}
      >
        {
          topics.map((topic, index) => (
            <TopicCard data={topic} isSelected={index == selectedTopic} onSelect={() => setSelectedTopic(topics[index])}/>
          ))
        }
      </ItemsCarousel>
      {selectedTopic &&
        <Paper className={classes.root}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Complexity</TableCell>
                <TableCell align="center">Estimated Time</TableCell>
                <TableCell align="center">Best Calification</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedTopic && selectedTopic.exercises && selectedTopic.exercises.map((row, index) => (
                <TableRow key={row.title}>
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell align="center">{row.complexity}</TableCell>
                  <TableCell align="center">{row.estimatedTime} seconds</TableCell>
                  <TableCell align="center">{row.exerciseResults && row.exerciseResults.length > 0 && row.exerciseResults[0] ? row.exerciseResults[0].calification : '0'} stars</TableCell>
                  <TableCell align="center">
                    <Button variant="contained" color="primary" icon={'Start'} onClick={() => start(row, index)} text={'Try Now!'}/>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      }

    </Container>
    </React.Fragment>
  );
}

Progreso.propTypes = {
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
)(Progreso);
