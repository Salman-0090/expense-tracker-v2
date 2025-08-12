import "./App.css";
import { useExpenseContext } from "./Context/ExpenseContext";
import Summary from "./Components/Summary";
import Type from "./Components/Type";
import Form from "./Components/Form";
import List from "./Components/List";

function App() {
  const { darkMode, toggleMode } = useExpenseContext();
  return (
    <div className={darkMode ? "App light" : "app dark"}>
      <div className="container">
        <span className="toggle" onClick={toggleMode}>
          {darkMode ? "🌙" : "🔆"}
        </span>
        <Summary />
        <Type />
        <Form />
        <List />
      </div>
    </div>
  );
}

export default App;
