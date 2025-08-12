import { useExpenseContext } from "../ExpenseContext";

function Type() {
  const { type, dispatch } = useExpenseContext();
  return (
    <div>
      <select
        className="select"
        value={type}
        onChange={(e) => dispatch({ type: "setType", payload: e.target.value })}
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
    </div>
  );
}

export default Type;
