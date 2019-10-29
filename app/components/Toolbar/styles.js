import styled from 'styled-components';
import { makeStyles } from "@material-ui/core/styles";

export const MainContainer = styled.section`
  width: ${props => (props.dev ? '100%' : '100vw')};
  display: flex;
  justify-content: space-between;
  position: ${props => (props.dev ? 'unset' : 'fixed')};
  z-index: 3;
  padding: 0;
  top: 0;
  height: 140px;
  background: black;
  border-bottom: 1px solid #f2f4f6;
  align-items: center;

  .logo {
    padding-left: 2rem;
    max-width: 300px;
    max-height: 110px;
  }

  .right {
    display: flex;
    margin-right: 30px;
    align-items: center;
  }
`;

export const NotificationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  -webkit-backdrop-filter: blur(16px);
  backdrop-filter: blur(16px);
  box-shadow: ${props => (props.active ? "none" : "inset 0 1px 00 #ffffff")};
  border: solid 1px #e7eaee;
  background-color: ${props => (props.active ? "#e7eaee" : "#ffffff")};
  cursor: pointer;
`;

export const Name = styled.div`
  color: white;
  margin: 0 15px;
  font-size: 18px;
  font-weight: bold;
`;

export const useStyles = makeStyles(theme => ({
  image: {
    margin: '0 !important',
  },
  padding: {
    padding: theme.spacing(0, 2)
  },
  customBadge: {
    backgroundColor: "#ff5c39",
    position: "absolute",
    left: "16px",
    top: "9px",
    width: "18px",
    height: "18px",
    color: "#fff"
  },
  avatar: {
    margin: 10,
    width: 30,
    height: 30,
  },
}));
