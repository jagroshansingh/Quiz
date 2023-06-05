import { createContext, useState } from "react";

export const QuizContext = createContext();

export const QuizContextProvider = ({ children }) => {
  const [quickQuestions, setQuickQuestions] = useState(null);
//   console.log(quickQuestions)
  return (
    <QuizContext.Provider value={{ quickQuestions, setQuickQuestions }}>
      {children}
    </QuizContext.Provider>
  );
};
