import React, { Component } from "react";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";

const EditCommandCell = (props) => {
  return (
    <td style={{ ...props.style }} className="k-grid-content-sticky">
      <button
        className="k-button k-primary mr-2"
        onClick={() => {
          console.log(props.dataItem);
          props.enterEdit(props.dataItem);
        }}
      >
        <i className="fas fa-edit"></i>
      </button>

      <button
        className="k-button k-grid-remove-command"
        onClick={() => {
          //console.log(props.dataItem);
          props.toggleAreYousuredialogDialog(props.dataItem);
        }}
      >
        <i className="fas fa-trash-alt"></i>
      </button>
      <div>
        {props.AreYousuredialog && (
          <Dialog
            title={"confirm"}
            style={{ position: "fixed" }}
            onClose={() => {
              //console.log(props.dataItem);
              props.toggleAreYousuredialogDialog({});
            }}
          >
            <p style={{ margin: "25px", textAlign: "center" }}>
              Are you sure ?
            </p>
            <DialogActionsBar>
              <button
                className="k-button"
                onClick={() => {
                  //console.log(props.dataItem);
                  props.toggleAreYousuredialogDialog({});
                }}
              >
                No
              </button>
              <button
                className="k-button"
                onClick={() => {
                  //console.log(props.dataItem);
                  props.remove({});
                  props.toggleAreYousuredialogDialog({});
                }}
              >
                Yes
              </button>
            </DialogActionsBar>
          </Dialog>
        )}
      </div>
    </td>
  );
};

export default EditCommandCell;
