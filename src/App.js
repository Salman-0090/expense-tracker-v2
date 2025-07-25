import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [type, setType] = useState("income");
  const [items, setItems] = useState(() => {
    const storedValue = localStorage.getItem("items");
    return storedValue ? JSON.parse(storedValue) : [];
  });

  const [darkMode, setDarkMode] = useState(() => {
    const storedValue = localStorage.getItem("themes");
    return storedValue ? JSON.parse(storedValue) : false;
  });

  function toggleMode() {
    setDarkMode((prevMode) => !prevMode);
  }

  function handleDelete(id) {
    setItems(items.filter((item) => item.id !== id));
  }

  useEffect(() => {
    localStorage.setItem("themes", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div className={darkMode ? "App light" : "app dark"}>
      <div className="container">
        <span className="toggle" onClick={toggleMode}>
          {darkMode ? "🌙" : "🔆"}
        </span>
        <Summary items={items} />
        <Type type={type} setType={setType} />
        <Form type={type} items={items} setItems={setItems} />
        <List items={items} onDelete={handleDelete} />
      </div>
    </div>
  );
}

function Summary({ items }) {
  const income = items
    .filter((item) => item.type === "income")
    .reduce((acc, crr) => acc + crr.amount, 0);

  const expense = items
    .filter((item) => item.type === "expense")
    .reduce((acc, crr) => acc + crr.amount, 0);

  const balance = income - expense;
  return (
    <div className="summary">
      <h2>Expense Tracker</h2>
      <div className="total-balance margin-bottom">
        <p> Balance</p>
        <p>₹ {balance}</p>
      </div>
      <div className="income-n-Expense">
        <div className="income">
          <p> Income</p>
          <p>₹ {income}</p>
        </div>
        <div className="expense">
          <p> Expense</p>
          <p>₹ {expense}</p>
        </div>
      </div>
    </div>
  );
}

function Type({ type, setType }) {
  return (
    <div>
      <select
        className="select"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
    </div>
  );
}

function Form({ type, items, setItems }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();

    if (description.trim() === "") {
      alert("Please enter a description");
      return;
    }

    if (Number(amount) <= 0 || isNaN(amount)) {
      alert("Please enter a valid amount greater than 0.");
      return;
    }
    const newItems = {
      id: Date.now(),
      description,
      amount: Number(amount),
      type,
    };
    setItems((prevItems) => [...prevItems, newItems]);

    setDescription("");
    setAmount(0);
  }

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="label">Description</label>
      <input
        type="text"
        placeholder="Description"
        className="input"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label className="label margin-left">Amount</label>
      <input
        type="number"
        placeholder="Amount"
        className="input margin-bottom"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button className="btn">Submit</button>
    </form>
  );
}

function List({ items, onDelete }) {
  return (
    <ul className="list">
      {items.map((item) => (
        <Listitem item={item} key={item.id} onDelete={onDelete} />
      ))}
    </ul>
  );
}

function Listitem({ item, onDelete }) {
  return (
    <li className="list-item">
      <div>{item.description}</div>
      <div className="amount-n-btn">
        <span>{item.amount}</span>
        <button className="btn-delete" onClick={() => onDelete(item.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default App;
