import { createContext, useState } from "react";

export const QuizContext = createContext();

export const QuizContextProvider = ({ children }) => {
  const [quizTitle, setQuizTitle]=useState(null)
    const [edit,setEdit]=useState(null)
  return (
    <QuizContext.Provider value={{ quizTitle, setQuizTitle, edit, setEdit }}>
      {children}
    </QuizContext.Provider>
  );
};
