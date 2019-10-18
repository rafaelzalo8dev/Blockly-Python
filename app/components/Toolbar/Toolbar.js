import React, { useState } from "react";
import { StyledContent } from "constants/styles";
import { MainContainer, ProfileContainer, useStyles, } from './styles'
import Badge from "@material-ui/core/Badge";
import PropTypes from 'prop-types';


const Toolbar = props => {
  const classes = useStyles();
  const [toggleState, setToggleState] = useState(true);

  const toggle = () => setToggleState(toggleState === false ? true : false);

  return (
    <StyledContent>
      <MainContainer dev={props.dev} >
        <div className="logo">
          Logo
        </div>
        <div className="right">
          <Badge
            className={classes.margin}
            classes={{ badge: classes.customBadge }}
            badgeContent={0}
          >
          </Badge>
          <ProfileContainer>
            <div className="company-name">
              <h3>
                {" "}
                {props.currentCompany.name
                  ? props.currentCompany.name.toUpperCase()
                  : null}
              </h3>
            </div>
            <div className="profile-caret">
              <div onClick={toggle} className="arrow">
                caret
              </div>
            </div>
          </ProfileContainer>
        </div>
      </MainContainer>
    </StyledContent>
  );
};

Toolbar.propTypes={
  user: PropTypes.string,
  dev: PropTypes.bool,
  image: PropTypes.string,
  profile: PropTypes.bool,
  currentCompany: PropTypes.object,
}

Toolbar.defaultProps = {
  user: 'User',
  dev: true,
  image: '',
  profile: true,
  currentCompany: '{{name:empresa}}',
}
export default Toolbar;
