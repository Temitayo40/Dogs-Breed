import React, { useEffect } from "react";
import List from "./dogList";
import Alert from "./Alert";
import "./App.css";
import { useGlobalContext } from "./context";

const App = () => {
  const {
    dogList,
    setDogList,
    dogName,
    setDogName,
    editID,
    setEditID,
    showAlert,
    removeItem,
    editItem,
    clearList,
    setIsEditing,
    isEditing,
    alert,
    data,
    setData,
  } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!dogName) {
      showAlert(true, "danger", "please enter value");
    } else if (dogName && isEditing) {
      setDogList(
        dogList.map((item) => {
          if (item.id === editID) {
            return { ...item, title: dogName };
          }
          return item;
        })
      );
      setDogName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "value changed");
    } else {
      // fetchData();

      showAlert(true, "success", "item added to the list");
      const newItem = { id: new Date().getTime().toString(), title: dogName };
      setDogList([...dogList, newItem]);
      setDogName("");
    }
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(dogList));
  }, [dogList]);

  return (
    <>
      <section className="section-center">
        <form className="grocery-form" onSubmit={handleSubmit}>
          {alert.show && (
            <>
              <Alert {...alert} removeAlert={showAlert} list={dogList} />
            </>
          )}

          <h3>To Do List</h3>

          <div className="form-control">
            <input
              type="text"
              className="grocery"
              placeholder="e.g. Dancing"
              value={dogName}
              onChange={(e) => setDogName(e.target.value)}
            />
            <button type="submit" className="submit-btn">
              {isEditing ? "edit" : "submit"}
            </button>
          </div>
        </form>

        {dogList.length > 0 && (
          <div className="grocery-container">
            <List items={dogList} removeItem={removeItem} editItem={editItem} />
            <button className="clear-btn" onClick={clearList}>
              clear items
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default App;
