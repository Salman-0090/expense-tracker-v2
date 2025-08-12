import { useExpenseContext } from "../ExpenseContext";

function Form() {
  const { type, description, amount, dispatch } = useExpenseContext();
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

    dispatch({ type: "addItem", payload: newItems });
    dispatch({ type: "reset" });
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="label">Description</label>
      <input
        type="text"
        placeholder="Description"
        className="input"
        value={description}
        onChange={(e) =>
          dispatch({ type: "setDescription", payload: e.target.value })
        }
      />

      <label className="label margin-left">Amount</label>
      <input
        type="number"
        placeholder="Amount"
        className="input margin-bottom"
        value={amount}
        onChange={(e) =>
          dispatch({ type: "setAmount", payload: e.target.value })
        }
      />
      <button className="btn">Submit</button>
    </form>
  );
}

export default Form;
