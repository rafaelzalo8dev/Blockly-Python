import styled from "styled-components";

export const FullPageContainer = styled.div`
  width: 100%;
  height: calc(100vh - 140px);
  padding: 30px 10% 10% 10%;
  text-align: center;
  font-family: 'Open Sans';
  background: #c8d1db;
  margin-bottom: 160px;
`;

export const Container = styled.div`
  width: 100%;
  font-family: 'Open Sans';
  justify-content: space-around;
`;

export const TextContainer = styled.div`
  font-size: 22px;
  padding: 40px 50px;
  text-align: left;
`;

export const Title = styled.div`
  font-size: 60px;
  padding: 10px 30px;
  font-weight: bold;
`;

export const SectionContainer = styled.div`
  width: 100%;
  height: calc(100vh - 140px);
  display: flex;
  padding-top: 80px;
  justify-content: space-around;
`;

export const MidWidth = styled.div`
  padding-top: 40px;
  width: 50%;
  text-align: center;
  img {
    max-width: 600px;
  }
`;
