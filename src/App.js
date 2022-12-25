import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

//![5] GET list item from local storage
const getlocalstorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  }
  else {
    return []
  }
};

function App() {
  //![1] set up some states
  const [itemName, setitemName] = useState(""); // name of input item inititally empty value
  const [list, setList] = useState(getlocalstorage); // List of itmes we will iterrated over it
  const [isEditing, setIsEditing] = useState(false); // for edit flag (edit button)
  const [editID, setEditID] = useState(null);

  /*alert is an {object} ,why? because we have more things will happend
    alert object properties {show alert , msg in alert {edit msg or delete msg} , type : sucess or dangers
    based on action alert will be change*/
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    //Handle user input ...

    // * in case of user input value = empty
    if (!itemName) {
      //itemName = false = empty value
      showAlert(true, "danger", "pls write something");
    }

    // user input value && isEditing = true
    else if (itemName && isEditing) {
      setList(
        //itterate over list --> list it is array of objects
        list.map((item) => {
          //if item.id equal editeId which assign in edite function
          if (item.id === editID) {
            // if yes copy last object and overwrite title with new ItemName
            return { ...list, title: itemName };
          }
          return item;
        })
      );
      setitemName("");
      setEditID(null);
      setIsEditing(false);
    }

    // ![2] adding item to list of items
    else {
      const newItem = { id: new Date().getTime().toString(), title: itemName }; // create new item  id , title
      setList([...list, newItem]); // adding the last list and adding the new item
      showAlert(true, "success", "new item added");
      setitemName("");
    }
  };

  // Create alert function
  // that alert disappear after 3000 sec
  const showAlert = (show, type, msg) => {
    setAlert({ show, type, msg });
  };

  //![3] create clear all function
  const clearAll = () => {
    setList([]); // empty list
    showAlert(true, "danger", "All items hass been removed"); // show alert
  };

  //![4]create remove item function & create edit function
  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id)); // item id which is not equal id will pass the test
    showAlert(true, "danger", "item hass been removed");
  };
  const editeItem = (id) => {
    const specItem = list.find((item) => item.id === id);
    setitemName(specItem.title);
    setIsEditing(true);
    setEditID(id);
    showAlert(true, "scuess", " value edited ");
  };

  //![5] store our list item in local storage
  // store list to local storge
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      {/* start form  */}
      <form action="" className="grocery-form" onSubmit={submitHandler}>
        {/* {...alert} we desturcture the alert object*/}
        {alert.show && <Alert {...alert} removeAlert={showAlert} {...list} />}
        <h3> Grocery Amr Bud</h3>
        <div className="form-control">
          <input
            className="grocery"
            placeholder="g. eggs"
            value={itemName}
            onChange={(e) => {
              setitemName(e.target.value);
            }}
          ></input>
          <button className="submit-btn">
            {/* make button text dynamic  */}
            {isEditing ? "Edite" : "Submit"}
          </button>
        </div>
      </form>
      {/* End Form */}

      {/* Grocery list items */}
      {/* This section will not appear just only have items in items list = list.length>0 */}
      {list.length > 0 && (
        <div className="grocery-container">
          {/* passing list of items to List component where we can itterated over it to display items */}
          <List items={list} removeItem={removeItem} editeItem={editeItem} />
          <button className="clear-btn" onClick={clearAll}>
            Clear All..
          </button>
        </div>
      )}
    </section>
  );
}
export default App;
