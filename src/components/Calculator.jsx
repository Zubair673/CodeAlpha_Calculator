import "./Calculator.css";
import { useState, useEffect, useCallback } from "react";

function Calculator() {
  const [input, setInput] = useState("");
  const [openBracket, setOpenBracket] = useState(true);

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleBracket = () => {
    setInput((prev) => prev + (openBracket ? "(" : ")"));
    setOpenBracket(!openBracket);
  };

  const clearScreen = () => {
    setInput("");
    setOpenBracket(true);
  };

  const deleteLast = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const calculateResult = useCallback(() => {
  try {
    const result = eval(input);
    setInput(result.toString());
  } catch {
    setInput("Error");
  }
}, [input]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key;

      if (
        (key >= "0" && key <= "9") ||
        ["+", "-", "*", "/", "."].includes(key)
      ) {
        setInput((prev) => prev + key);
      } else if (key === "Enter") {
        calculateResult();
      } else if (key === "Backspace") {
        deleteLast();
      } else if (key === "Escape") {
        clearScreen();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [calculateResult]);

  return (
    <div className="calculator">
      <h1>Calculator</h1>

      <input
        type="text"
        value={input}
        readOnly
        className="display"
      />

      <div className="buttons">

        <button onClick={clearScreen}>C</button>
        <button onClick={handleBracket}>( )</button>
        <button onClick={() => handleClick("/")}>÷</button>
        <button onClick={() => handleClick("*")}>×</button>

        <button onClick={() => handleClick("7")}>7</button>
        <button onClick={() => handleClick("8")}>8</button>
        <button onClick={() => handleClick("9")}>9</button>
        <button onClick={() => handleClick("-")}>−</button>

        <button onClick={() => handleClick("4")}>4</button>
        <button onClick={() => handleClick("5")}>5</button>
        <button onClick={() => handleClick("6")}>6</button>
        <button onClick={() => handleClick("+")}>+</button>

        <button onClick={() => handleClick("1")}>1</button>
        <button onClick={() => handleClick("2")}>2</button>
        <button onClick={() => handleClick("3")}>3</button>
        <button onClick={calculateResult}>=</button>

        <button className="zero" onClick={() => handleClick("0")}>
          0
        </button>

        <button onClick={() => handleClick(".")}>.</button>
        <button onClick={deleteLast}>⌫</button>

      </div>
    </div>
  );
}

export default Calculator;