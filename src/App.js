import "./App.css";
import { useExpenseContext } from "./Context/ExpenseContext";
import Summary from "./Context/Components/Summary";
import Type from "./Context/Components/Type";
import Form from "./Context/Components/Form";
import List from "./Context/Components/List";

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
