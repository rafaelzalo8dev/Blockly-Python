import styled from "styled-components";
import Typography from "typography";

const typography = new Typography({
  bodyFontFamily: ["auto", "Roboto", "Arial"]
});

// Output CSS as string.
typography.toString();

// Or insert styles directly into the <head> (works well for client-only
// JS web apps.
typography.injectStyles();

//UI COLORS
export const white = "#ffffff";
export const black = "#272a2d";
export const grayDark = "#696d77";
export const grayMedium = "#e0e3e5";
export const grayLight = "#f2f4f6";

//BLUE
export const BlueDark = "#2286db";
export const BlueMedium = "#2494f3";
export const BlueLight = "#4fa8f4";

//PURPLE

export const PurpleDark = "#764aa4";
export const PurpleMedium = "#8a57c1";
export const PurpleLight = "#a078cc";

//ORANGE

export const OrangeDark = "#eb4f2d";
export const OrangeMedium = "#ff5c39";
export const OrangeLight = "#fe7c60";

//GREEN

export const GreenDark = "#0d9e4f";
export const GreenMedium = "#0fb75b";
export const GreenLight = "#3ec47b";

//YELLOW

export const YellowDark = "#e2ab02";
export const YellowMedium = "#ffc206";
export const YellowLight = "#fecd37";

const LINE_HEIGHT = 1;
const LETTER_SPACING = "normal";

const COLOR_H1 = "#272A2D";
const COLOR_H2 = "#272A2D";
const COLOR_H3 = "#272A2D";
const COLOR_H4 = "#272A2D";
const COLOR_H5 = "#272a2d";
const COLOR_P = "#6a6f7c";

const LINE_HEIGHT_H1 = 1;
const LINE_HEIGHT_H2 = 1.14;
const LINE_HEIGHT_H3 = 1.33;
const LINE_HEIGHT_H4 = 1.38;
const LINE_HEIGHT_H5 = 1.71;

const H1_SIZE = 2.5;
const H2_SIZE = 1.75;
const H3_SIZE = 1;
const H4_SIZE = 0.875;
const H5_SIZE = 0.875;
const P_SIZE = 1;

// AVATAR
export const AVATAR_SIZE_SMALL = '1.5rem';
export const AVATAR_SIZE_NORMAL = '2.5rem';

export const Box = styled.section`
  h2,
  h3,
  h4 {
    margin-bottom: 0.8rem;
  }
  p {
    margin: 0;
    color: ${COLOR_P};
  }
  h4,
  h3 {
    margin-top: 3rem;
  }
  box-sizing: border-box;
  .grid-container {
    width: 30%;
    margin: 0 auto;
    padding: 0 1.25rem;
    box-sizing: border-box;
  }
  .column,
  .columns {
    width: 100%;
    float: left;
    box-sizing: border-box;
  }
  /* For devices larger than 400px */
  @media (min-width: 360px) {
    .grid-container {
      width: 80%;
      padding: 0;
    }
  }
  @media (min-width: 400px) {
    .grid-container {
      width: 80%;
      padding: 0;
    }
  }
  /* For devices larger than 550px */
  @media (min-width: 550px) {
    .grid-container {
      width: 50%;
    }
    .column,
    .columns {
      margin-left: 4%;
    }
    .column:first-child,
    .columns:first-child {
      margin-left: 0;
    }
    .one.column,
    .one.columns {
      width: 4.66666666667%;
    }
    .two.columns {
      width: 13.3333333333%;
    }
    .three.columns {
      width: 22%;
    }
    .four.columns {
      width: 30.6666666667%;
    }
    .five.columns {
      width: 39.3333333333%;
    }
    .six.columns {
      width: 48%;
    }
    .seven.columns {
      width: 56.6666666667%;
    }
    .eight.columns {
      width: 65.3333333333%;
    }
    .nine.columns {
      width: 74%;
    }
    .ten.columns {
      width: 82.6666666667%;
    }
    .eleven.columns {
      width: 91.3333333333%;
    }
    .twelve.columns {
      width: 100%;
      margin-left: 0;
    }
    .one-third.column {
      width: 30.6666666667%;
    }
    .two-thirds.column {
      width: 65.3333333333%;
    }
    .one-half.column {
      width: 48%;
    }
    /* Offsets */
    .offset-by-one.column,
    .offset-by-one.columns {
      margin-left: 8.66666666667%;
    }
    .offset-by-two.column,
    .offset-by-two.columns {
      margin-left: 17.3333333333%;
    }
    .offset-by-three.column,
    .offset-by-three.columns {
      margin-left: 26%;
    }
    .offset-by-four.column,
    .offset-by-four.columns {
      margin-left: 34.6666666667%;
    }
    .offset-by-five.column,
    .offset-by-five.columns {
      margin-left: 43.3333333333%;
    }
    .offset-by-six.column,
    .offset-by-six.columns {
      margin-left: 52%;
    }
    .offset-by-seven.column,
    .offset-by-seven.columns {
      margin-left: 60.6666666667%;
    }
    .offset-by-eight.column,
    .offset-by-eight.columns {
      margin-left: 69.3333333333%;
    }
    .offset-by-nine.column,
    .offset-by-nine.columns {
      margin-left: 78%;
    }
    .offset-by-ten.column,
    .offset-by-ten.columns {
      margin-left: 86.6666666667%;
    }
    .offset-by-eleven.column,
    .offset-by-eleven.columns {
      margin-left: 95.3333333333%;
    }
    .offset-by-one-third.column,
    .offset-by-one-third.columns {
      margin-left: 34.6666666667%;
    }
    .offset-by-two-thirds.column,
    .offset-by-two-thirds.columns {
      margin-left: 69.3333333333%;
    }
    .offset-by-one-half.column,
    .offset-by-one-half.columns {
      margin-left: 52%;
    }
  }
`;

export const P = styled.div`
  font-size: ${H3_SIZE};
  color: ${grayDark};
  margin: 0;
`;

export const ReportContainer = styled.div`
  margin: 0;
  margin-top: 3rem;
  && ul {
    margin-left: 0;

    ul {
      padding-left: 1.5rem;
    }
  }

  && h1 {
    font-size: ${H3_SIZE}rem;
    line-height: ${LINE_HEIGHT_H3};
    color: ${COLOR_H3};
  }
  && h2 {
    font-size: ${H3_SIZE}rem;
    line-height: ${LINE_HEIGHT_H3};
    color: ${COLOR_H3};
    margin-bottom:18px;

  }
  && h3 {
    margin: 0;
    font-size: ${H3_SIZE}rem;
    line-height: ${LINE_HEIGHT_H3};
    color: ${COLOR_H4};
    margin-bottom:18px;
  }
  && h4, h5 {
    font-size: 12px;
    color: #272a2d;
  }
  && p {
    margin-bottom:18px;
    font-weight: normal;
    font-size: ${P_SIZE}rem;
    color: ${COLOR_P};
  }
  && a:visited,
  a:link {
    font-size: ${P_SIZE}rem;
    text-decoration: underlined;
    font-weight: medium;
    color ${black};
  }
  && a:hover,
  a:active {
    font-size: ${P_SIZE}rem;
    text-decoration: underlined;
    font-weight: normal;
    color: ${COLOR_H4};
  }
  && strong {
    font-weight: 500;
    line-height: ${LINE_HEIGHT_H4};
    color: #272a2d;
  }
  && li {
    color: ${COLOR_P};
    font-size: ${P_SIZE}rem;
    list-style-type: disc;
    li {
      list-style-type: circle;
    }
  }
  && table {
    display: block;
    flex-direction: column;
    overflow-x: scroll;
    scrollbar-width: none;
  }
  && thead {
    min-width: 1000px;
    color: ${COLOR_P};
    font-size: ${P_SIZE}rem;
    padding: 0.5rem;
  }
  && th {
    font-weight: normal;
    margin-top: 1rem;
    font-size: ${H5_SIZE}rem;
    line-height: ${LINE_HEIGHT_H5};
    color: ${COLOR_H5};
  }
  && tr {
    min-width: 1000px;
    color: ${COLOR_P};
    font-size: ${P_SIZE}rem;
    padding: 0.5rem;
  }
  && td {
    color: ${COLOR_P};
    font-size: ${P_SIZE}rem;
    padding: 0.5rem;
  }
  && td {
    color: ${COLOR_P};
    font-size: ${P_SIZE}rem;
    padding: 0.5rem;
  }
  && img {
    margin:20px 0;
    width:70%;
  }
  && p {
    overflow-x: scroll;
    scrollbar-width: none;
  }
`;

export const StyledContent = styled.section`
  h1,
  h2,
  h4,
  h5,
  h6 {
    margin: 0;
    color: ${black};
    line-height: ${LINE_HEIGHT};
    letter-spacing: ${LETTER_SPACING};
    font-weight: 500;
    margin-bottom: 1.45rem;
  }
  h1 {
    font-size: ${H1_SIZE}rem;
    line-height: ${LINE_HEIGHT_H1};

  }

  h2 {
    font-size: ${H2_SIZE}rem;
    line-height: ${LINE_HEIGHT_H2};
  }
  h3 {
    margin: 0;
    color: ${black};
    font-weight: 500;
    margin-bottom:0.8rem;
    letter-spacing: ${LETTER_SPACING};
    font-size: ${H3_SIZE}rem;
    line-height: ${LINE_HEIGHT_H3};
  }
  .passive {
    color: #868d9a;
  }
  h4 {
    font-size: ${H4_SIZE}rem;
    line-height: ${LINE_HEIGHT_H4};
    color: ${COLOR_H4};
  }
  p {
    line-height: 20px;
    font-size: ${H3_SIZE}rem;
    color: ${COLOR_P};
    font-weight: normal;
  }
  .footer {
    font-size: 12px;
    color:#6a6f7c
  }
  .description,
  .bio,
  .descriptionError {
    font-size: 13px;
    color: #868d9a;
  }
  .label {
    font-weight:500;
    font-size: 12px;
    color: #272a2d;
  }

  li {
    margin: 0;
  }
  ul {
    margin-left: 0;
    margin-bottom: 1.5rem;
  }
  ul > li {
    margin-bottom: 0;
  }
  ul > li li {
    margin: 0;
  }
  li > * {
    margin: 0;
  }
  strong {
    font-size: ${P_SIZE}rem;
    font-weight: bold;
  }
  ul {
    margin-bottom: 1rem;
  }
  /* span{
    font-weight:normal;
  } */
  img {
    margin: 2rem 0;
    max-width: 100%;
  }
  .specialP {
    font-size: 0.75rem;
    color: ${grayDark};
    margin: 0;
  }
  .darkP{
    font-weight:500;
    color:#272a2d;
  }
  .link {
    text-decoration: underline;
    color: #6a6f7c;
    font-weight:regular;
    font-size:16px
    cursor: pointer;
    :hover {
      color: #000;
    }
  }
`;
