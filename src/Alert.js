import React, { useEffect } from "react";

const Alert = ({ type, msg,removeAlert , list }) => {
  // use useEffect for alert removal
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);

    return ()=>clearTimeout(timeout);
  }, [list]);

  return (
    // we added dynamic className
    // alert class added as default class then another class based on type of alert  { `alert alert-${type}` }
    <p className={`alert alert-${type}`}> {msg} </p>
  );
};

export default Alert;
