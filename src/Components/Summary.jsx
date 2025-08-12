import { useExpenseContext } from "../Context/ExpenseContext";

function Summary() {
  const { items } = useExpenseContext();
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

export default Summary;
