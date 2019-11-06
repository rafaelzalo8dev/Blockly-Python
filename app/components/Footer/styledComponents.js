import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  font-family: 'Open Sans';
  justify-content: space-around;
`;

export const TextContainer = styled.div`
  font-size: 18px;
  padding: 20px 30px;
  text-align: center;
`;

export const Title = styled.div`
  font-size: 20px;
  padding: 5px 10px;
  font-weight: bold;
`;

export const SectionContainer = styled.div`
  width: 100%;
  background: #c4c4c4;
  display: flex;
  padding: 10px 30px;
  justify-content: space-around;
`;

export const MidWidth = styled.div`
  padding-top: 40px;
  width: 50%;
  text-align: center;
`;

export const QuarterWidth = styled.div`
  padding-top: 10px;
  width: 25%;
  text-align: center;
  img {
    max-width: 300px !important;
  }
`;
