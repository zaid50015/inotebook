import React from "react";
import Alert from "react-bootstrap/Alert";

export default function AlertItem(props) {
  return (
    <>
    
      {props.Alert && (
        <Alert key={props.Alert.type} variant={props.Alert.type}>
          <strong>
            {props.Alert.type === "success" ? "Success" : "Error"}
          </strong>{" "}
          {props.Alert.message}
        </Alert>
      )}
    </>
  );
}
