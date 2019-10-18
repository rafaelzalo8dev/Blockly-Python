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
  height: 4.875rem;
  background: white;
  border-bottom: 1px solid #f2f4f6;
  align-items: center;

  .logo {
    padding-left: 2rem;
  }

  @media (max-width: 550px) {
    padding-top: 0.5rem;
    height: 5rem;
    background-color: white;
  }
  .right {
    display: flex;
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
export const ProfileContainer = styled.div`
  display: flex;
  min-width: 179px;
  height: 56px;
  border-radius: 3px;
  border: solid 1px #e0e3e5;
  margin-right: 12px;
  align-items: center;

  .profile-caret {
    display: flex;
    align-items: center;
    margin-left: auto;
  }
  .arrow {
    cursor: pointer;
    margin-left: 5px;
  }
  .company-name {
    display: flex;
    margin-left: auto;
    h3 {
      margin-bottom: 0 !important;
      font-size: 22px !important;
      padding: 0.5rem;
    }
  }
  @media (max-width: 520px) {
    min-width: auto;
    border: none;
    .company-name {
      display: none;
    }
  }
`;

export const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(0, 3)
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
  }
}));
