# Quiz App

This project is a quiz application built with React and Vite. It fetches quiz questions from a JSON file, presents them to the user in a full-screen mode, and saves the user's progress, including the timer and answers, in local storage. If the user refreshes the page, the quiz resumes from where they left off. Once the quiz is submitted, the state is cleared from local storage.

## Features

- Full-screen mode enforcement
- Fetches quiz questions from a JSON file
- 10 questions per quiz
- Saves progress in local storage
- 10-minute timer for the quiz
- Multiple-choice questions
- State persistence across page refreshes
- Displays results upon quiz submission

## Technologies Used

- React
- Vite
- Material-UI

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/zaheernaqvi72/QuizApp.gitquiz-app.git
    ```
2. Navigate to the project directory:
    ```sh
    cd QuizApp
    ```
3. Install dependencies:
    ```sh
    npm install
    ```

### Running the Application

1. Start the development server:
    ```sh
    npm run dev
    ```
2. Open your browser and navigate to `http://localhost:5173` to see the application in action.

## Project Structure

- `src/`
  - `App.jsx`: The main component that handles full-screen logic and fetches quiz questions.
  - `Quiz.jsx`: The component that handles the quiz logic, including state management, timer, and user interactions.
  - `questions.json`: The JSON file containing quiz questions.

## Usage

1. Launch the application.
2. Click on the "Enter Fullscreen" button to start the quiz.
3. Answer the questions. Your progress is automatically saved.
4. If you refresh the page, the quiz will resume from where you left off.
5. Once you finish all the questions, click the "Submit" button to see your results.

## Quiz Component Documentation

### Props

- `questions`: An array of objects representing quiz questions. Each object should have the following structure:
    ```json
    {
      "question": "What is the capital of France?",
      "choices": ["Paris", "London", "Berlin", "Madrid"],
      "correct_answer": "Paris"
    }
    ```

### State Management

The state is managed using the `useReducer` hook and includes the following:

- `currentQuestion`: The index of the current question being displayed.
- `answers`: An object that stores the user's answers, with question indices as keys.
- `timer`: The remaining time in seconds.
- `quizSubmitted`: A boolean indicating whether the quiz has been submitted.

### Reducer Actions

- `LOAD_STATE`: Loads the saved state from `localStorage`.
- `SET_ANSWER`: Sets the answer for the current question.
- `NEXT_QUESTION`: Moves to the next question.
- `PREV_QUESTION`: Moves to the previous question.
- `DECREMENT_TIMER`: Decrements the timer by one second.
- `SUBMIT_QUIZ`: Marks the quiz as submitted.

### Effects

- On mount, the component attempts to load the saved state from `localStorage` and starts the timer.
- On state change, the state is saved to `localStorage`.

## App Component Documentation

### Full-Screen Logic

- Uses the Fullscreen API to handle entering and exiting full-screen mode.
- Persists the full-screen state in `localStorage` to maintain it across page refreshes.

### Fetching Questions

- Fetches questions from `questions.json` using the `fetch` API.
- Displays a loading indicator while fetching.
- Handles errors during fetching and displays an error message if necessary.

