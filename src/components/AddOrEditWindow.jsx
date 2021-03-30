import React, { Component } from "react";
import { Window } from "@progress/kendo-react-dialogs";

class AddOrEditWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  toggleDialog = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };

  render() {
    return (
      <div>
        <button
          title={this.props.buttontitle}
          className="k-button k-primary"
          onClick={this.toggleDialog}
        >
          Add new
        </button>
        {this.state.visible && (
          <Window
            style={{ position: "fixed" }}
            title={this.props.title}
            onClose={this.toggleDialog}
            height={this.props.height}
            width={this.props.width}
          >
            {/* <form className="k-form"> */}
            {this.props.children}
            {/* <div className="text-right ">
                <button
                  type="button"
                  className="k-button k-primary mx-2 my-2"
                  onClick={this.props.handelSave}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="k-button mx-1 my-2"
                  onClick={this.toggleDialog}
                >
                  Cancel
                </button>
              </div> */}
            {/* </form> */}
          </Window>
        )}
      </div>
    );
  }
}

export default AddOrEditWindow;
