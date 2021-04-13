import React, { Component } from "react";
import { Switch } from "@progress/kendo-react-inputs";

const ActiveAndDisableCommandCell = (props) => {
  return (
    <td style={{ ...props.style }} className="k-grid-content-sticky">
      <Switch
        defaultChecked={props.dataItem.isActive}
        onChange={() => props.toggleSwitch(props.dataItem)}
      />
    </td>
  );
};

export default ActiveAndDisableCommandCell;
