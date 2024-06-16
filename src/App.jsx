import { useState, useEffect } from 'react';
import Quiz from './Quiz';
import { Button, Container, CircularProgress } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

function App() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const savedFullscreenState = JSON.parse(localStorage.getItem('isFullscreen'));
    if (savedFullscreenState) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    }

    const fullscreenChange = () => {
      const fullscreenEnabled = !!document.fullscreenElement;
      setIsFullscreen(fullscreenEnabled);
      localStorage.setItem('isFullscreen', JSON.stringify(fullscreenEnabled));
    };
    document.addEventListener('fullscreenchange', fullscreenChange);

    return () => document.removeEventListener('fullscreenchange', fullscreenChange);
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/questions.json');
        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Network response was not ok: ${text}`);
        }
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <p>Error loading questions: {error.message}</p>
      </Container>
    );
  }

  return (
    <Container>
      <Button onClick={handleFullscreen} variant="contained" startIcon={isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}>
        {isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
      </Button>
      {isFullscreen ? (
        questions.length > 0 ? <Quiz questions={questions} /> : <p>Loading questions...</p>
      ) : (
        <p>Please enable fullscreen mode to start the quiz.</p>
      )}
    </Container>
  );
}

export default App;
