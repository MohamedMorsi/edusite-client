import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  Grid,
  GridColumn as Column,
  GridToolbar,
} from "@progress/kendo-react-grid";
import { process } from "@progress/kendo-data-query";

const dataState = {
  sort: [{ field: "code", dir: "asc" }],
  take: 10,
  skip: 0,
};

class BasicGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataState: dataState,
    };
  }

  render() {
    return (
      <Grid
        pageable
        sortable
        style={{ height: "400px" }}
        data={process(
          this.props.data.map((item) => ({
            ...item,
            Id: this.props.data.indexOf(item) + 1,
          })),
          this.state.dataState
        )}
        {...this.state.dataState}
        onDataStateChange={(e) => {
          this.setState({ dataState: e.dataState });
        }}
      >
        {this.props.children}
      </Grid>
    );
  }
}

export default BasicGrid;
