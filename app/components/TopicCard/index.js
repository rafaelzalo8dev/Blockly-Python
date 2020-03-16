/**
 *
 * TopicCard
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 360,
    minWidth: 300,
    marginBottom: 3,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
  },
  avatar: {
    backgroundColor: 'black',
  },
}));

export function TopicCard({data, onSelect}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    onSelect();
  };

  return (
    <Grid item xs>
      <Card className={classes.card} xs={4} onClick={handleExpandClick}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {data.name.charAt(0)}
            </Avatar>
          }
          title={data.name}
          subheader={`${data.exercises.length} exercises`}
        />
        <CardMedia
          className={classes.media}
          image={"images/pythoncode.png"}
          title="Python topic"
        />
        <CardContent>
          <Typography color="textSecondary" component="p">
            {data.description}
          </Typography>
          <Typography>General average: {data.promedio || 10}</Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            Show Exercises
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
}
TopicCard.propTypes = {
  data: PropTypes.object,
  onSelect: PropTypes.func,
};

export default memo(TopicCard);
