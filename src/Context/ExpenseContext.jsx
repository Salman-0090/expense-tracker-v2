import {
  createContext,
  useReducer,
  useState,
  useEffect,
  useContext,
} from "react";

const ExpenseContext = createContext();

const InitialState = {
  type: "income",
  items: [],
  description: "",
  amount: 0,
};

function init(InitialState) {
  return {
    ...InitialState,
    items: JSON.parse(localStorage.getItem("items")) || [],
  };
}

function reducer(state, action) {
  switch (action.type) {
    case "setType":
      return { ...state, type: action.payload };
    case "addItem":
      return { ...state, items: [...state.items, action.payload] };

    case "deleteItem":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case "setDescription":
      return { ...state, description: action.payload };

    case "setAmount":
      return { ...state, amount: action.payload };

    case "reset":
      return { ...state, description: "", amount: 0 };
    default:
      throw new Error("unkown action");
  }
}

function ExpenseProvider({ children }) {
  const [{ type, items, description, amount }, dispatch] = useReducer(
    reducer,
    InitialState,
    init
  );

  const [darkMode, setDarkMode] = useState(() => {
    const storedValue = localStorage.getItem("themes");
    return storedValue ? JSON.parse(storedValue) : false;
  });

  function toggleMode() {
    setDarkMode((prevMode) => !prevMode);
  }

  useEffect(() => {
    localStorage.setItem("themes", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <ExpenseContext.Provider
      value={{
        type,
        items,
        description,
        amount,
        dispatch,
        darkMode,
        toggleMode,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

function useExpenseContext() {
  const context = useContext(ExpenseContext);
  if (context === undefined)
    throw new Error("ExpenseContext was used outside the ExpenseProvider");
  return context;
}

export { ExpenseProvider, useExpenseContext };
