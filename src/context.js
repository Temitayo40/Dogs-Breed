import React, { useState, useContext, useEffect } from "react";

const AppContext = React.createContext();

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};
const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [dogName, setDogName] = useState("");
  const [data, setData] = useState([]);
  const [dogList, setDogList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };
  const clearList = () => {
    showAlert(true, "danger", "empty list");
    setDogList([]);
    setData([]);
  };
  const removeItem = (id) => {
    showAlert(true, "danger", "item removed");
    setDogList(dogList.filter((item) => item.id !== id));
  };
  const editItem = (id) => {
    const specificItem = dogList.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setDogName(specificItem.title);
  };

  return (
    <AppContext.Provider
      value={{
        dogList,
        setDogList,
        editID,
        setEditID,
        showAlert,
        clearList,
        removeItem,
        editItem,
        setDogName,
        dogName,
        isEditing,
        setIsEditing,
        alert,
        data,
        setData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
