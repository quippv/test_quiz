import { useState, useEffect } from "react";
import { quizData } from "data";
import { shuffle } from "./Utility";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Question = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [time, setTime] = useState(10);
  const [inQuiz, setInQuiz] = useState(true);

  const success = () => toast.success("🦄 Wow so easy!");
  const fail = () => toast.error("🦄 Sorry your wrong!");
  const timeout = () => toast.error("🦄 Sorry timeout!");

  useEffect(() => {
    inQuiz
      ? setTimeout(() => {
          setTime(time - 1);
        }, 1000)
      : setTime(30);

    return () => inQuiz && clearTimeout(time);
  }, [time, inQuiz]);

  useEffect(() => {
    time === 0 && timeout() && setInQuiz(false);
  }, [time]);

  const TwoChoice = quizData[currentQuestion].type === "two_choice" && inQuiz && (
    <>
      {quizData[currentQuestion].question.text && (
        <h3 className="text-xl text-center">
          {quizData[currentQuestion].question.text}
        </h3>
      )}
      <div className="flex items-center justify-around mt-12">
        {quizData[currentQuestion].chooses.map((answer) => (
          <p
            key={answer.id}
            className="cursor-pointer"
            onClick={() => {
              quizData[currentQuestion].right_answer === answer.id
                ? success()
                : fail();
              setInQuiz(false);
            }}
          >
            {answer.text}
          </p>
        ))}
      </div>
    </>
  );

  const FourChoice = quizData[currentQuestion].type === "four_choices" &&
    inQuiz && (
      <>
        {quizData[currentQuestion].question.text && (
          <h3 className="text-xl text-center">
            {quizData[currentQuestion].question.text}
          </h3>
        )}
        <div className="flex items-center justify-around mt-12">
          <h4 className="bg-black text-white p-8">
            {quizData[currentQuestion].question.img}
          </h4>
          <div className="flex items-start justify-around flex-col">
            {quizData[currentQuestion].chooses.map((answer) => (
              <p
                key={answer.id}
                className="cursor-pointer mb-10"
                onClick={() => {
                  quizData[currentQuestion].right_answer === answer.id
                    ? success()
                    : fail();
                  setInQuiz(false);
                }}
              >
                {answer.text}
              </p>
            ))}
          </div>
        </div>
      </>
    );

  return (
    <>
      <div
        style={{
          background: "green",
          width: `${((currentQuestion + 1) / quizData.length) * 100}%`,
          height: 5,
          transition: "all 0.5s linear",
        }}
      ></div>
      <div className="w-full relative h-screen pt-8">
        {TwoChoice}
        {FourChoice}
        {!inQuiz && (
          <>
            <h3 className="text-xl text-center">Explanation</h3>
            {quizData[currentQuestion].explanation.map((exp, index) => (
              <p key={index} className="mb-8">
                {exp}
              </p>
            ))}
          </>
        )}
        <div className="absolute bg-black text-white p-8 bottom-32 left-1/2 -translate-x-1/2 rounded-full">
          {time}
        </div>
        {!inQuiz && (
          <div
            className="absolute bg-black text-white p-8 bottom-32 right-16 cursor-pointer"
            onClick={() => {
              currentQuestion < quizData.length - 1
                ? setCurrentQuestion(currentQuestion + 1)
                : setCurrentQuestion(0);
              currentQuestion === quizData.length - 1 && shuffle(quizData);
              setInQuiz(true);
            }}
          >
            <h2>
              {currentQuestion === quizData.length - 1 ? "Start Again" : "Next"}
            </h2>
          </div>
        )}
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};
