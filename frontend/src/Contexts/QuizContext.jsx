import { createContext, useState } from "react";

export const QuizContext = createContext();

export const QuizContextProvider = ({ children }) => {
  const [quickQuestions, setQuickQuestions] = useState(null);
  const [quizTitle, setQuizTitle]=useState(null)
    const [edit,setEdit]=useState(null)
  return (
    <QuizContext.Provider value={{ quickQuestions, setQuickQuestions, quizTitle, setQuizTitle, edit, setEdit }}>
      {children}
    </QuizContext.Provider>
  );
};
