import * as React from "react";
// import { connect } from "react-redux";
import CardContainer from "../../components/CardContainer";
import { process } from "@progress/kendo-data-query";
import {
  ExcelExport,
  ExcelExportColumn,
} from "@progress/kendo-react-excel-export";
import {
  Grid,
  GridColumn as Column,
  GridToolbar,
} from "@progress/kendo-react-grid";
import AdminTitles from "./AdminTitles";
import AddOrEditUserForm from "../../components/admin/AddOrEditUserForm";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import EditCommandCell from "../../components/EditCommandCell";
import {
  GetAllUsers,
  register,
  UpdateUser,
  DeleteUser,
} from "../../api/adminApi.js";

const dataState = {
  sort: [{ field: "code", dir: "asc" }],
  take: 10,
  skip: 0,
};

class AdminUsers extends React.Component {
  _export;
  export = () => {
    this._export.save();
  };

  state = {
    dataState: dataState,
    openFormEdit: false,
    openFormAdd: false,
    AreYousuredialog: false,
    editItem: {},
    selectedTodelete: {},
    data: [],
    selectedID: null,
  };

  async componentDidMount() {
    console.log("entered");
    const promise = await GetAllUsers();
    promise == undefined
      ? this.setState({ data: [] })
      : this.setState({ data: promise.data });
  }

  toggleAreYousuredialogDialog = (item) => {
    console.log(item);
    this.setState({
      AreYousuredialog: !this.state.AreYousuredialog,
      selectedTodelete: item,
    });
  };

  enterEdit = (item) => {
    //console.log(item);
    this.setState({
      openFormEdit: true,
      editItem: item,
    });
  };

  remove = async (item) => {
    if (this.state.selectedTodelete !== {}) {
      console.log("deleted", this.state.selectedTodelete);
      const res = await DeleteUser(this.state.selectedTodelete.id);
    }
    const { data } = await GetAllUsers();
    this.setState({
      data: data,
    });
  };

  //TODO : Change and Update Password

  handleSubmitEdit = async (event) => {
    console.log(event);
    event.languageId = 1;
    //event.roleId = event.role.id;
    if (event.tenant !== undefined) {
      event.tenantId = event.tenant.tenantId;
    }
    const res = await UpdateUser(event.id, event);
    const { data } = await GetAllUsers();
    this.setState({
      data: data,
      openFormEdit: false,
    });
  };

  handleSubmitAdd = async (event) => {
    console.log(event);
    event.languageId = 1;
    event.roleId = event.role.id;
    if (event.tenant !== undefined) {
      event.tenantId = event.tenant.tenantId;
    }
    const res = await register(event);
    const { data } = await GetAllUsers();
    this.setState({ data: data, openFormAdd: false });
  };

  handleCancelEdit = () => {
    this.setState({ openFormEdit: false });
  };
  handleCancelAdd = () => {
    this.setState({ openFormAdd: false });
  };

  ActionCommandCell = (props) => (
    <EditCommandCell
      {...props}
      enterEdit={this.enterEdit}
      remove={this.remove}
      AreYousuredialog={this.state.AreYousuredialog}
      toggleAreYousuredialogDialog={this.toggleAreYousuredialogDialog}
    />
  );

  render() {
    return (
      <CardContainer>
        <AdminTitles title={"grades"} />
        <hr />
        <div className="card-component">
          <Grid
            style={{ height: "450px" }}
            pageable
            sortable
            reorderable
            resizable
            filterable={true}
            selectedField="selected"
            data={process(
              this.state.data.map((item) => ({
                ...item,
                Id: this.state.data.indexOf(item) + 1,
                selected: item.id === this.state.selectedID,
              })),
              this.state.dataState
            )}
            {...this.state.dataState}
            onDataStateChange={(e) => {
              this.setState({ dataState: e.dataState });
            }}
            onRowClick={(e) => {
              console.log(e.dataItem);
              this.setState({ selectedID: e.dataItem.id });
            }}
          >
            <GridToolbar>
              <button
                title={"Add New Grade"}
                className="k-button k-primary"
                onClick={() => {
                  this.setState({ openFormAdd: true });
                }}
              >
                + Add new
              </button>

              {this.state.openFormAdd && (
                <AddOrEditUserForm
                  cancelEdit={this.handleCancelAdd}
                  onSubmit={this.handleSubmitAdd}
                  item={{}}
                  title={"Add New Grade"}
                />
              )}
            </GridToolbar>

            <Column
              field="Id"
              title="#"
              width="50px"
              locked={true}
              filterable={false}
            />
            {/* <Column field="id" title="id" width="100px" /> */}
            <Column field="userName" title="UserName" width="250px" />
            <Column field="role.name" title="Role" width="200px" />
            <Column field="isActive" title="Is Active" width="200px" />
            <Column field="tenant.tenantName" title="Tenant" width="200px" />
            <Column field="email" title="Email" width="200px" />

            <Column
              cell={this.ActionCommandCell}
              width="100px"
              locked={true}
              filterable={false}
            />
          </Grid>
          {this.state.openFormEdit && (
            <AddOrEditUserForm
              cancelEdit={this.handleCancelEdit}
              onSubmit={this.handleSubmitEdit}
              item={this.state.editItem}
              title={"Edit Grade"}
              edit={true}
            />
          )}
        </div>
      </CardContainer>
    );
  }
}

export default AdminUsers;
