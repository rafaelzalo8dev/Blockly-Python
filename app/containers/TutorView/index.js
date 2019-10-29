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
import history from 'utils/history';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectTutorView from './selectors';
import reducer from './reducer';
import Blockly from 'blockly';
import BlocklyPython from 'blockly/python';
import ContentDefault from 'utils/content';
import Button from 'components/BlocklyButton';
import {
  Instrucciones,
  ToolContainer,
  CodeContainer,
  ExerciseInstruction,
  ExerciseTitle,
  MidWidth,
  Topic,
  ButtonContainer,
  TitleContainer,
} from './styledComponents';
import ResultDialog from 'components/ResultDialog';
import BlocklyComponent from 'components/Blockly';
import Toolbar from 'components/Toolbar';
import StepperInstructions from 'components/StepperInstructions';
export function TutorView(props) {
  useInjectReducer({ key: 'tutorView', reducer });
  const [toolboxCategories, setToolboxCategories] = useState([]);
  const [simpleWorkspace, setWorkspace] = useState(null);
  const [code, setCode] = useState('');
  const [codeArray, setCodeArray] = useState([]);
  const [exercise, setExercise] = useState({});
  const [showExerciseHints, setShowExerciseHints] = useState(false);
  const [hintTimes, setHintTimes] = useState(0);
  const [showToolContainer, setShowToolContainer] = useState(false);
  const [timeExpend, setTimeExpend] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState(null);
  const [calification, setCalification] = useState(0);
  const [dialogTitle, setDialogTitle] = useState('');
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    console.log('props.location en tutor', props.location);
    const exerciseProp = props.location ? props.location.exercise : null;
    if(!exerciseProp) {
      history.push('/progreso');
    }
    setExercise(exerciseProp);
  }, []);

  useEffect(() => {
    if(simpleWorkspace && simpleWorkspace.workspace){
      console.log('entra al if');
      simpleWorkspace.workspace.addChangeListener(generateCode);
    }
  }, [simpleWorkspace]);
  //
  setTimeout(function () {
    if(showToolContainer) {
      if(timeExpend >= exercise.estimatedTime - 1) {
        setShowToolContainer(false);
        setDialogMessage(
          <div>
            <div>The time of this excersise was reached.</div>
            <div>You should try with another excercise goint to the menú.</div>
          </div>
        );
        setDialogTitle('Timeout, You should Try Again!');
        setOpenDialog(true);
        setTimeExpend(exercise.estimatedTime);
      } else {
        const newTime = timeExpend + 1;
        setTimeExpend(newTime);
      }
    }
  }, 1000);
  const generateCode = () => {
    const code1 = BlocklyPython.workspaceToCode(simpleWorkspace.workspace);
    console.log('code1 ', code1);
    const array = code1.split("\n");
    setCode(code1);
    const cleanArray = [];
    array.forEach(lineOfCode => {
      if(lineOfCode !== '') cleanArray.push(lineOfCode);
    });
    setCodeArray(cleanArray);
  };

  const testCode = () => {
    let isOK = false;
      if(exercise.solutions && exercise.solutions.length > 0) {
        exercise.solutions.forEach(solution => {
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
      })

    } else {
      isOK = false;
    }

    if(isOK){
      setDialogMessage(
        <div>
          <div>Your time was: {timeExpend}</div>
          <div>Your calification is: {calification}</div>
        </div>
      );
      setDialogTitle('Well done!');
    } else {
      if(exercise.hints && exercise.hints.length > hintTimes) {
        setDialogMessage(
          <div>
            <div>You have {exercise.hints ? exercise.hints.length - hintTimes : 0 } more hints remaining or you should try with another excercise going to the menú</div>
          </div>
        );
      } else {
        setDialogMessage(
          <div>
            <div>You have not reached the point of this exercise.</div>
            <div>You should try with another excercise going to the menú.</div>
          </div>
        );
      }

      setDialogTitle('Something is wrong!');
    }
    setOpenDialog(true);
  };

  const showHints = () => {
    setShowExerciseHints(true);
    if(hintTimes == exercise.hints.length) {
      setDialogMessage(
        <div>
          <div>You should try with another excercise goint to the menú, or ask for help</div>
        </div>
      );
      setDialogTitle("There are no more hints remaining for this exercise!");
      setOpenDialog(true);
    } else {
      setHintTimes(hintTimes + 1);
    }
  };

  const closeHint = () => {
    setTimeout(function() {
      setShowExerciseHints(false);
    }, 3000);
  };

  const goToProgress = ()  => {
    setOpenDialog(false);
    const selectedTopic = localStorage.getItem('topicID');
    history.push({
      pathname: '/progreso',
      topic: selectedTopic,
    });
  };

  return <div>
    <Toolbar />
    <Topic>{exercise.topic}</Topic>
    <Instrucciones>
      <MidWidth>
        <ExerciseTitle>{exercise.name}</ExerciseTitle>
        <ExerciseInstruction>
          <ExerciseTitle>Instructions</ExerciseTitle>
          {
            exercise.instructions &&
              exercise.instructions.map((el, idx) => (
                <ExerciseInstruction onClick={el.onclick}>{idx + 1}-. {el.text} </ExerciseInstruction>
              ))
          }
          <Button variant="contained" color="primary" onClick={() => setShowInstructions(true)} text={'Show details'}/>
        </ExerciseInstruction>
        <ExerciseInstruction>
          {
            showExerciseHints && exercise.hints &&
            <React.Fragment>
              <ExerciseTitle>Hints</ExerciseTitle>
              {
                exercise.hints.map((el, idx) => {
                    if(hintTimes > idx) {
                      return (
                        <ExerciseInstruction onClick={el.onclick}>{idx + 1}-. {el.text} </ExerciseInstruction>
                      );
                    }
                })
              }
            </React.Fragment>
          }
        </ExerciseInstruction>
      </MidWidth>
      <MidWidth>
        <ExerciseInstruction>
          <ExerciseTitle>Time estimated: {exercise.estimatedTime || 600} seconds</ExerciseTitle>
          <ExerciseTitle>Time expend: {timeExpend} seconds</ExerciseTitle>
        </ExerciseInstruction>
        {!showToolContainer &&
          <ButtonContainer>
            <Button variant="contained" color="primary" onClick={() => setShowToolContainer(true)} text={'Start!'} />
          </ButtonContainer>
        }
        {showToolContainer &&
          <React.Fragment>
            <ButtonContainer>
              <Button variant="contained" color="primary" onClick={() => setShowToolContainer(false)} text={'Pause!'}/>
              <Button variant="contained" color="primary" onClick={generateCode} text={'Convert'}/>
              <Button variant="contained" color="primary" onClick={showHints} text={'Show Hint'}/>
              <Button variant="contained" color="primary" onClick={testCode} text={'Test Code'}/>
            </ButtonContainer>
          </React.Fragment>
        }

      </MidWidth>
    </Instrucciones>
    {showInstructions &&
      <StepperInstructions
        open={showInstructions}
        handleClose={() => setShowInstructions(false)}
        data={{instructions: exercise.instructions || []}}
      />
    }
    { showToolContainer &&
      <TitleContainer>
        <MidWidth>
          <ExerciseTitle>Blockly</ExerciseTitle>
        </MidWidth>
        <MidWidth>
        <ExerciseTitle>Python code generated</ExerciseTitle>
        </MidWidth>
      </TitleContainer>
    }
    {openDialog &&
      <ResultDialog
        open={openDialog}
        goToProgress={goToProgress}
        handleClose={() => setOpenDialog(false)}
        message={dialogMessage}
        title={dialogTitle}
      />
    }
    {showToolContainer &&
      <ToolContainer>
        <BlocklyComponent
          code={code}
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
        />
      </ToolContainer>
    }
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
