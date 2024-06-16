import { useReducer, useEffect } from 'react';
import { Container, Paper, Typography, Radio, RadioGroup, FormControlLabel, Button } from '@mui/material';
import PropTypes from 'prop-types';

const TIMER_LIMIT = 600;

const initialState = {
  currentQuestion: 0,
  answers: {},
  timer: TIMER_LIMIT,
  quizSubmitted: false,
};

const quizReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_STATE':
      return {
        ...state,
        ...action.payload,
      };
    case 'SET_ANSWER':
      return {
        ...state,
        answers: {
          ...state.answers,
          [state.currentQuestion]: action.payload,
        },
      };
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
      };
    case 'PREV_QUESTION':
      return {
        ...state,
        currentQuestion: state.currentQuestion - 1,
      };
    case 'DECREMENT_TIMER':
      return {
        ...state,
        timer: state.timer - 1,
      };
    case 'SUBMIT_QUIZ':
      return {
        ...state,
        quizSubmitted: true,
      };
    default:
      return state;
  }
};

const Quiz = ({ questions }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem('quizState'));
    if (savedState) {
      dispatch({ type: 'LOAD_STATE', payload: savedState });
    }

    const timerInterval = setInterval(() => {
      dispatch({ type: 'DECREMENT_TIMER' });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  useEffect(() => {
    if (state.timer <= 0) {
      dispatch({ type: 'SUBMIT_QUIZ' });
      localStorage.removeItem('quizState');
    } else {
      localStorage.setItem('quizState', JSON.stringify(state));
    }
  }, [state]);

  const handleAnswerChange = (event) => {
    dispatch({ type: 'SET_ANSWER', payload: event.target.value });
  };

  const handleNextQuestion = () => {
    dispatch({ type: 'NEXT_QUESTION' });
  };

  const handlePrevQuestion = () => {
    dispatch({ type: 'PREV_QUESTION' });
  };

  const handleSubmit = () => {
    dispatch({ type: 'SUBMIT_QUIZ' });
    localStorage.removeItem('quizState');
  };

  const renderResults = () => {
    const correctAnswers = questions.reduce((count, question, index) => {
      return count + (state.answers[index] === question.correct_answer ? 1 : 0);
    }, 0);
    return (
      <Typography variant="h5">You answered {correctAnswers} out of {questions.length} questions correctly.</Typography>
    );
  };

  if (state.quizSubmitted) {
    return (
      <Container component={Paper} style={{ padding: '20px', marginTop: '20px' }}>
        {renderResults()}
      </Container>
    );
  }

  return (
    <Container component={Paper} style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h4">Quiz</Typography>
      <Typography variant="h6">Time Remaining: {`${Math.floor(state.timer / 60)}:${state.timer % 60}`}</Typography>
      <Typography variant="h6">Question {state.currentQuestion + 1} of {questions.length}</Typography>
      <Typography variant="h5" style={{ marginTop: '20px' }}>{questions[state.currentQuestion].question}</Typography>
      <RadioGroup value={state.answers[state.currentQuestion] || ''} onChange={handleAnswerChange}>
        {questions[state.currentQuestion].choices.map((choice, index) => (
          <FormControlLabel key={index} value={choice} control={<Radio />} label={choice} />
        ))}
      </RadioGroup>
      <div style={{ marginTop: '20px' }}>
        <Button onClick={handlePrevQuestion} disabled={state.currentQuestion === 0} variant="contained">Previous</Button>
        <Button onClick={handleNextQuestion} disabled={state.currentQuestion === questions.length - 1} variant="contained" style={{ marginLeft: '10px' }}>Next</Button>
        <Button onClick={handleSubmit} disabled={state.currentQuestion !== questions.length - 1} variant="contained" color="primary" style={{ marginLeft: '10px' }}>Submit</Button>
      </div>
    </Container>
  );
};

Quiz.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      choices: PropTypes.arrayOf(PropTypes.string).isRequired,
      correct_answer: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Quiz;
