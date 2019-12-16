import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import history from 'utils/history';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectTutorView from './selectors';
import reducer from './reducer';
import Webcam from "react-webcam";
import Blockly from 'blockly';
import BlocklyPython from 'blockly/python';
import ContentDefault from 'utils/content';
import Button from 'components/BlocklyButton';
import FuzzyLogic from 'fuzzy';
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
import SkulptConsole from 'components/SkulptConsole';
import BlocklyComponent from 'components/Blockly';
import Toolbar from 'components/Toolbar';
import StepperInstructions from 'components/StepperInstructions';
import DataDialog from 'components/DataDialog';
import {
  apiSuccesAction,
  apiErrorAction,
  loading,
  closeSnackbar,
} from 'containers/App/actions';
import { post, get, sendImg } from 'utils/request';
export function TutorView({dispatch, location}) {
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
  const [calification, setCalification] = useState(9);
  const [dialogTitle, setDialogTitle] = useState('');
  const [showData, setShowData] = useState(false);
  const [rightActionText, setRightAction] = useState('');
  const [leftActionText, setLeftAction] = useState('');
  const [isOkResult, setIsOkResult] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hintsToShow, setHintsToShow] = useState([]);
  const [openRunner, setOpenRunner] = useState(false);
  const [videoSrc, setVideoSrc] = useState(null);

  useEffect(() => {
    const exerciseProp = location ? location.exercise : null;
    if(exerciseProp) {
      dispatch(loading());
      get({
        url: `/exercises/getById?id=${exerciseProp}`
      })
      .then(result => {
        setShowData(true);
        setIsLoading(false);
        dispatch(apiSuccesAction());
        setExercise(result);
      })
      .catch(err => {
        dispatch(apiErrorAction(err));
        setTimeout(function() {
          dispatch(closeSnackbar());
        }, 3000);
      });
    } else {
      history.push('/progreso');
    }

  }, []);

  useEffect(() => {
    if(simpleWorkspace && simpleWorkspace.workspace){
      simpleWorkspace.workspace.addChangeListener(generateCode);
    }
  }, [simpleWorkspace]);

  setTimeout(function () {
    if(showToolContainer && !openDialog && !openRunner && !negativo) {
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
        if(newTime % 5 == 0) {
          capture();
        }
        setTimeExpend(newTime);
      }
    }
  }, 1000);

  const runCode = () => {
    if(exercise.hints && exercise.hints.length > hintTimes) {
      setDialogMessage(
        <div>
          <div>You have {exercise.hints ? exercise.hints.length - hintTimes : 0 } more hint(s) remaining or you should try with another excercise going to the menú</div>
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
    setOpenRunner(true);
  };

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

  const evaluate = (data) => {
    const fuzzyObj = {
  		crisp_input: [data[0], data[1], data[2]],
  		variables_input: [{
				name: "Complexity",
				setsName: ["Easy", "Medium", "Hard"],
				sets: [
					[0,0,1,2],
					[1,2,3,4],
					[3,5,5,6]
				]
			},
  			{
  				name: "Time expend",
  				setsName: ["Early", "Normal", "Late"],
  				sets: [
  					[0,0,80,120],
  					[80,120,220,240],
  					[220,300,600,600]
  				]
  			},
  			{
  				name: "Hints used",
  				setsName: ["None", "Some", "All"],
  				sets: [
  					[0,0,1,2],
  					[1,1,2,3],
  					[2,3,5,5]
  				]
  			}
  		],
  		variable_output: {
  			name: "Calification",
  			setsName: ["Low", "Normal", "Nice"],
  			sets: [
  				[0,0,3,4],
  				[2,4,7,9],
  				[7,8,10,10]
  			]
  		},
  		inferences: [
  			[1,2,2],
  			[2,1,0],
  			[2,1,0]
  		]
  	}
    return FuzzyLogic.getResult(fuzzyObj);
  };

  const testCode = () => {
    let isOK = false;
    let sameLineCounter = 0;
    if(exercise.solutions && exercise.solutions.length > 1) {
        exercise.solutions.forEach(solution => {
          if(solution.length == codeArray.length) {
            let sameLineCounter = 0;
            for(let i = 0; i < solution.length; i ++){
              if(solution[i] == codeArray[i]) {
                sameLineCounter+= 1;
              }
            }
          }
      })
      isOK  = true;
    } else {
      if(exercise.solutions.length == 1) {
        sameLineCounter = 1;
        isOK = true;
      }
    }
    setCalification(parseInt(evaluate([parseInt(exercise.complexity), parseInt(timeExpend), parseInt(hintTimes)])) + 3);
    setLeftAction('Close');
    setRightAction('Go to Menú');
    if(sameLineCounter === exercise.solutions.length) {
      if(calification < 4) {
        setDialogMessage(
          <div>
            <div>Your time was: {timeExpend}</div>
            <div>Your calification is: {calification}</div>
          </div>
        );

        setLeftAction('Close');
        setRightAction('Go to Menú');
        setDialogTitle('There is something wrong!');
      } else {
        setDialogMessage(
          <div>
            <div>Your time was: {timeExpend}</div>
            <div>Your calification is: {calification}</div>
          </div>
        );
        setIsOkResult(true);
        setDialogTitle('Well done!');
        setRightAction('Next Exercise');
      }
      isOK = true;
    }
    setOpenDialog(true);

    if(!isOK){
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
      setOpenDialog(true);
    }
  };

  const nextExercise = () => {
    dispatch(loading());
    post({
      url: '/exercisesResult',
      body: {
        userId: JSON.parse(localStorage.getItem('user')).id,
        exerciseId: exercise.id,
        calification
      }
    })
    .then(resultCreated => {
      get({
        url: `/exercises/getNextExercise?topicId=${exercise.topicId}&complexity=${calification > 7 ? exercise.complexity + 1 : exercise.complexity - 1}`
      })
      .then(result => {
          dispatch(apiSuccesAction());
          setOpenDialog(false);
          history.push({
            pathname: '/nextExercise',
            exercise: result,
          });
      })
      .catch(err => {
        apiErrorAction(
            'There are no more exercises of this topic. You should try with another topic in the Menú.'
        );
        setOpenDialog(true);
        // goToProgress();
      });
    })
    .catch(err => {
      apiErrorAction(
          'Error trying to save your progress.'
      );
      setOpenDialog(true);
    });

  };

  const showHints = () => {
    if(hintTimes == exercise.hints.length) {
      setDialogMessage(
        <div>
          <div>You should try with another excercise goint to the menú, or ask for help</div>
        </div>
      );
      setLeftAction('Close');
      setRightAction('Go to Menú');
      setDialogTitle("There are no more hints remaining for this exercise!");
      setOpenDialog(true);
    } else {
      setShowExerciseHints(true);
      const hints = [];
      for(let i = 0; i < hintTimes + 1; i++){
        hints.push(exercise.hints[i]);
      }
      setHintsToShow(hints);
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

  const videoConstraints = {
    width: 160,
    height: 160,
    facingMode: "user"
  };

  const webcamRef = React.useRef(null);
  const [negativo, setNegativo] = useState(false);

  const capture = function() {
    if(webcamRef && webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      sendImg(imageSrc)
      .then(response => {
        console.log('emocion: ', response);
        const showNegative = response == 'neutral' || response == 'aburrido';
        if(showNegative) {
          setNegativo(true);
        }
      })
      .catch(err => {
        console.log('err ', err);
      });
    }
  };



  return <div>
    <Toolbar />
    <Webcam
      audio={false}
      height={100}
      ref={webcamRef}
      screenshotFormat="image/jpeg"
      width={100}
      videoConstraints={videoConstraints}
    />
    <Topic>{exercise && exercise.topic ? exercise.topic.name : ''}</Topic>
    <Instrucciones>
      <MidWidth>
        <ExerciseTitle>{exercise.title}</ExerciseTitle>
        <ExerciseInstruction>
          <ExerciseTitle>Instructions</ExerciseTitle>
          {
            exercise && exercise.instructions && exercise.instructions.map((instruction, index) => {
              return (
                <div id={index}> {index + 1} - {instruction.text}</div>
              );
            })
          }
        </ExerciseInstruction>
      </MidWidth>
      <MidWidth>
        <ExerciseTitle>Hints</ExerciseTitle>
        <Button variant="contained" color="primary" icon={'Hints'} onClick={showHints} text={'Show Hint'}/>
        {
          exercise && exercise.hints && hintsToShow.map((hint, index) => {
            return (
              <div id={index}> {index + 1} - {hint.text}</div>
            );
          })
        }
        <ExerciseInstruction>
          <ExerciseTitle>Time estimated: {exercise.estimatedTime || 600} seconds</ExerciseTitle>
          <ExerciseTitle>Time expend: {timeExpend} seconds</ExerciseTitle>
        </ExerciseInstruction>
      </MidWidth>
      <MidWidth>

        <ExerciseTitle>Documentation</ExerciseTitle>
        <Button variant="contained" color="primary" onClick={() => setShowData(true)} icon ={'Info'} text={'Show docs'}/>
        {!showToolContainer &&
            <Button variant="contained" color="primary" icon={'Start'} onClick={() => setShowToolContainer(true)} text={'Start'} />
        }
        {showToolContainer &&
          <React.Fragment>
            <Button variant="contained" color="primary" icon={'Pause'} onClick={() => setShowToolContainer(false)} text={'Pause'}/>
            <Button variant="contained" color="primary" icon={'Test'} onClick={runCode} text={'Run Code'}/>
          </React.Fragment>
        }
      </MidWidth>
    </Instrucciones>
    {negativo &&
      <ResultDialog
        open={negativo}
        goToProgress={() => {
          goToProgress();
        }}
        rightActionText={'Go to progress'}
        leftActionText={'Never mind'}
        handleClose={() => {
          setNegativo(false);
        }}
        leftAction={() => {
          setNegativo(false);
        }}
        message={'Try another exercise, ot get back later.'}
        title={'We have detected a negative face'}
      />
    }
    {exercise && showData &&
      <DataDialog
        title={'Exercise documentation'}
        message={'Python docs about this exercise topic at the link.'}
        leftAction={() => setShowData(false)}
        leftActionText={'Close'}
        url={exercise.docURL}
        open={showData}
        handleClose={() => setShowData(false)}
        data={{instructions: exercise.instructions || []}}
      />
    }
    { exercise && showToolContainer &&
      <TitleContainer>
        <MidWidth>
          <ExerciseTitle>Blockly</ExerciseTitle>
        </MidWidth>
        <MidWidth>
        <ExerciseTitle>Python code generated</ExerciseTitle>
        </MidWidth>
      </TitleContainer>
    }
    {exercise && openDialog &&
      <ResultDialog
        open={openDialog}
        goToProgress={() => {
          if(isOkResult) {
            dispatch(loading());
            nextExercise();
          } else {
            goToProgress();
          }
        }}
        rightActionText={rightActionText || '-'}
        leftActionText={leftActionText || '-'}
        handleClose={() => {
          setOpenDialog(false);
        }}
        leftAction={() => {
          if(!isOkResult){
            setOpenDialog(false);
          } else {
            goToProgress();
          }
        }}
        message={dialogMessage}
        title={dialogTitle}
      />
    }
    {exercise && showToolContainer &&
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
          onChange={() => console.log('change0')}
          initialXml={`
            <xml xmlns="http://www.w3.org/1999/xhtml">
            </xml>
          `}
        />
      </ToolContainer>
    }
    {exercise && openRunner &&
      <SkulptConsole
        open={openRunner}
        goToProgress={() => {
          if(isOkResult) {
            nextExercise();
          } else {
            goToProgress();
          }
        }}
        leftActionText={leftActionText}
        handleClose={() => {
          setOpenDialog(false);
          setOpenRunner(false);
        }}
        message={'-'}
        code={code}
        testCode={testCode}
        title={'Python console'}
      />
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
