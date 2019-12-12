import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  FullPageContainer, Container, TextContainer, Title, SectionContainer, MidWidth, QuarterWidth
} from './styledComponents';
import Button from 'components/BlocklyButton';
function Footer() {
  return (
    <SectionContainer>
      <QuarterWidth>
        <img
          styles={{maxWidth: '300px !important', width: '100%'}}
          src="https://storage.googleapis.com/blockly-api/Group%201%20(1).png"
        />
      </QuarterWidth>
      <QuarterWidth>
        <Title>MCC - FIA</Title>
        <Title>DR. RAMON ZATARAÍN</Title>
        <Title>RAFAEL ZAVALA LÓPEZ</Title>
        <Button href={'https://github.com/rafaelzalo8dev/Blockly-Python'} target="_blank" icon={'GitHub'} text={'Ver código'} />
      </QuarterWidth>
      <QuarterWidth>
        <img
          styles={{maxWidth: '300px', width: '100%'}}
          src="https://storage.googleapis.com/blockly-api/logotec.png"
          alter="logotect"
        />
      </QuarterWidth>
    </SectionContainer>
  );
}

export default Footer;
