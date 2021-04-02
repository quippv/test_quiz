import "assets/css/style.css";
import { Question } from "components/Question";

function App() {
  return (
    <>
      <div className="mx-full">
        <h1 className="text-center text-lg py-8 border-b-2 border-solid border-black">
          Example Quiz
        </h1>
      </div>
      <Question />
    </>
  );
}

export default App;
