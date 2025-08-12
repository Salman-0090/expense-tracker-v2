import { useExpenseContext } from "../ExpenseContext";

function List() {
  const { items, dispatch } = useExpenseContext();
  return (
    <ul className="list">
      {items.map((item) => (
        <Listitem
          item={item}
          key={item.id}
          onDelete={(id) => dispatch({ type: "deleteItem", payload: id })}
        />
      ))}
    </ul>
  );
}

export default List;

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
