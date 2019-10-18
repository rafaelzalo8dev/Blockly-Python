/**
 *
 * TutorView
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectReducer } from 'utils/injectReducer';
import makeSelectTutorView from './selectors';
import reducer from './reducer';
import Blockly from 'blockly';
import BlocklyPython from 'blockly/python';
import ContentDefault from 'utils/content';
import Skulpt from 'skulpt';
import {
  Instrucciones,
  ToolContainer,
  CodeContainer,
  ExerciseInstruction,
  ExerciseTitle,
  MidWidth,
  Topic,
} from './styledComponents';

import BlocklyComponent, { Block, Value, Field, Shadow, Category, Separator } from 'components/Blockly';
export function TutorView() {
  useInjectReducer({ key: 'tutorView', reducer });
  const [name, setName] = useState('');
  const [toolboxCategories, setToolboxCategories] = useState([]);
  const [simpleWorkspace, setWorkspace] = useState(null);
  const [code, setCode] = useState('');
  const [codeArray, setCodeArray] = useState([]);
  const [exercise, setExercise] = useState({});
  const [showExerciseHints, setShowExerciseHints] = useState(false);
  const [hintTimes, setHintTimes] = useState(0);
  useEffect(() => {
    const storedName = localStorage.getItem('nombre');
    if(storedName) {
      setName(storedName);
    }
    setExercise({
      topic: 'Maths',
      instructions: [
        'Create a variable called base',
        'Set value to the base variable as : 20.',
        'Create a variable called height.',
        'Set value to the base variable as : 5.',
        'Use the area form:  (base * height)/2.',
        'Print the area for the result.'
      ],
      title: 'Cálcula el área de un triángulo.',
      hints: [
        'To create a variable you have to access to the Variables category and choose Create Variable.',
        'To create some calcs you have to access to the Math category and choose a block for math operations.',
        'To perform print functions you need to access to the Text category and select Print.'
      ],
      solutions: [["rafa = None", "rafa = 'rafa1231'", "print(rafa)"]],
    })
  }, []);
  const generateCode = () => {
    const code1 = BlocklyPython.workspaceToCode(simpleWorkspace.workspace);
    const array = code1.split("\n");
    setCode(code1);
    const cleanArray = [];
    array.forEach(lineOfCode => {
      if(lineOfCode !== '') cleanArray.push(lineOfCode);
    });
    setCodeArray(cleanArray);
  };

  const testCode = () => {
    console.log(codeArray);
    let isOK = false;
    exercise.solutions.forEach(solution => {
      console.log('solucion ', solution);
      if(solution.length == codeArray.length) {
        let sameLineCounter = 0;
        for(let i = 0; i < solution.length; i ++){
          if(solution[i] == codeArray[i]) {
            sameLineCounter+= 1;
          }
        }
        if(sameLineCounter === solution.length) {
          isOK = true;
        }
      }
    });
    if(isOK){
      alert('AL CIEN PARIENTE');
    } else {
      alert('TE FALLA EN ALGO BATO');
    }
  };

  const showHints = () => {
    setShowExerciseHints(true);
    setHintTimes(hintTimes + 1);
  };

  return <div>
    <Topic>{exercise.topic}</Topic>
    <Instrucciones>
      <MidWidth>
      <ExerciseTitle>{exercise.title}</ExerciseTitle>
      <ExerciseInstruction>
        <ExerciseTitle>Instrucciones</ExerciseTitle>
        {
          exercise.instructions &&
            exercise.instructions.map((el, idx) => (
              <ExerciseInstruction onClick={el.onclick}>{idx + 1}-. {el} </ExerciseInstruction>
            ))
        }
      </ExerciseInstruction>
      <ExerciseInstruction>
        <ExerciseTitle>Pistas</ExerciseTitle>
        {
          showExerciseHints && exercise.hints &&
            exercise.hints.map((el, idx) => {
                if(hintTimes > idx) {
                  return (
                    <ExerciseInstruction onClick={el.onclick}>{idx + 1}-. {el} </ExerciseInstruction>
                  );
                }
            })
        }
      </ExerciseInstruction>
      </MidWidth>
      <MidWidth>
        <CodeContainer value={code} />
        <button onClick={generateCode}>Convert</button>
        <button onClick={showHints}>Hints</button>
        <button onClick={testCode}>Test</button>
      </MidWidth>
    </Instrucciones>
    <ToolContainer>
      <BlocklyComponent
        ref={e => setWorkspace(e)}
        readOnly={false}
        move={{
          scrollbars: true,
          drag: true,
          wheel: true
        }}
        initialXml={`
          <xml xmlns="http://www.w3.org/1999/xhtml">
          </xml>
        `}
      >
        <Category name="Variables" colour="#a55b80" custom="VARIABLE" />
        <Category name="Text" colour="#5ba58c">
          <Block type="text">
             <Field name="TEXT" />
          </Block>
          <Block type="text_print">
             <Value name="TEXT">
             </Value>
          </Block>
          <Block type="text_changeCase">
             <Field name="CASE">UPPERCASE</Field>
          </Block>
          <Block type="text_append">
             <Field name="VAR" id="]-wAnB=H71,Ke.IAnaJj">item</Field>
             <Value name="TEXT">
             </Value>
          </Block>
          <Block type="text_length">
             <Value name="VALUE">
             </Value>
          </Block>
          <Block type="text_getSubstring">
             <mutation at1="true" at2="true" />
             <Field name="WHERE1">FROM_START</Field>
             <Field name="WHERE2">FROM_START</Field>
             <Value name="STRING">
                <Block type="variables_get">
                   <Field name="VAR" id="hap-HM`}wxFzYerZ3qXu">text</Field>
                </Block>
             </Value>
          </Block>
          <Block type="text_indexOf">
             <Field name="END">FIRST</Field>
             <Value name="VALUE">
             </Value>
             <Value name="FIND">
                <Shadow type="text">
                   <Field name="TEXT">abc</Field>
                </Shadow>
             </Value>
          </Block>
          <Block type="text_join">
             <mutation items="2" />
          </Block>
          <Block type="text_charAt">
             <mutation at="true" />
             <Field name="WHERE">FROM_START</Field>
             <Value name="VALUE">
                <Block type="variables_get">
                   <Field name="VAR" id="hap-HM`}wxFzYerZ3qXu">text</Field>
                </Block>
             </Value>
          </Block>
        </Category>
        <Category name="Lists" colour="#745ba5">
          <Block type="lists_create_with">
             <mutation items="4" />
          </Block>
          <Block type="lists_indexOf">
             <Field name="END">FIRST</Field>
             <Value name="VALUE">
                <Block type="variables_get">
                   <Field name="VAR" id="gDJGB;k/,rOcw;teB3So">list</Field>
                </Block>
             </Value>
          </Block>
          <Block type="lists_repeat">
             <Value name="NUM">
                <Shadow type="math_number">
                   <Field name="NUM">5</Field>
                </Shadow>
             </Value>
          </Block>
          <Block type="lists_length" />
          <Block type="lists_isEmpty" />

          <Block type="lists_getIndex">
             <mutation statement="false" at="true" />
             <Field name="MODE">GET</Field>
             <Field name="WHERE">FROM_START</Field>
             <Value name="VALUE">
                <Block type="variables_get">
                   <Field name="VAR" id="gDJGB;k/,rOcw;teB3So">list</Field>
                </Block>
             </Value>
          </Block>
        </Category>
        <sep />
        <Category name="Math" colour="#5b67a5">
          <Block type="math_round">
             <Field name="OP">ROUND</Field>
             <Value name="NUM">
                <Shadow type="math_number">
                   <Field name="NUM">3.1</Field>
                </Shadow>
             </Value>
          </Block>
          <Block type="math_number">
             <Field name="NUM">0</Field>
          </Block>
          <Block type="math_single">
             <Field name="OP">ROOT</Field>
             <Value name="NUM">
                <Shadow type="math_number">
                   <Field name="NUM">9</Field>
                </Shadow>
             </Value>
          </Block>
          <Block type="math_constant">
             <Field name="CONSTANT">PI</Field>
          </Block>
          <Block type="math_arithmetic">
             <Field name="OP">ADD</Field>
          </Block>
          <Block type="math_on_list">
             <mutation op="SUM" />
             <Field name="OP">SUM</Field>
          </Block>
          <Block type="math_modulo">
          </Block>
          <Block type="math_random_int">
             <Value name="FROM">
                <Shadow type="math_number">
                   <Field name="NUM">1</Field>
                </Shadow>
             </Value>
             <Value name="TO">
                <Shadow type="math_number">
                   <Field name="NUM">100</Field>
                </Shadow>
             </Value>
          </Block>
        </Category>
        <Category name="Logic" colour="#5b80a5">
          <Block type="controls_if" />
          <Block type="logic_compare">
             <Field name="OP">EQ</Field>
          </Block>
          <Block type="logic_operation">
             <Field name="OP">AND</Field>
          </Block>
          <Block type="logic_negate" />
          <Block type="logic_boolean">
             <Field name="BOOL">TRUE</Field>
          </Block>
          <Block type="logic_null" />
          <Block type="logic_ternary" />
        </Category>
        <sep />
        <Category name="Loops" colour="#5ba55b">
          <Block type="controls_repeat_ext">
             <Value name="TIMES">
                <Shadow type="math_number">
                </Shadow>
             </Value>
          </Block>
          <Block type="controls_whileUntil">
             <Field name="MODE">{'WHILE'}</Field>
          </Block>
          <Block type="controls_for">
             <Field name="VAR" id="bIywjwW}EGY^,`/o4Yg_">i</Field>
             <Value name="BY">
                <Shadow type="math_number">
                   <Field name="NUM">1</Field>
                </Shadow>
             </Value>
          </Block>
          <Block type="controls_forEach">
             <Field name="VAR" id="h|UvWVkv?BIRA|Nz+9k8">item</Field>
          </Block>
        </Category>
        <Category name="Functions" colour="#995ba5" custom="PROCEDURE" />
      </BlocklyComponent>
    </ToolContainer>

  </div>;
}

TutorView.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  tutorView: makeSelectTutorView(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(TutorView);
