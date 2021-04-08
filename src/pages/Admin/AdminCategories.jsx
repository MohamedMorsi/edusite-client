import * as React from "react";
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
import TenantTitles from "./AdminTitles";
import AddOrEditTenantForm from "../../components/admin/AddOrEditTenantForm";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import EditCommandCell from "../../components/EditCommandCell";
import {
  GetAllTenants,
  CreateTenant,
  UpdateTenant,
  DeleteTenant,
} from "../../api/adminApi.js";

const dataState = {
  sort: [{ field: "code", dir: "asc" }],
  take: 10,
  skip: 0,
};

class AdminCategories extends React.Component {
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
    // const promise = await GetAllTenants();
    // promise == undefined
    //   ? this.setState({ data: [] })
    //   : this.setState({ data: promise.data });
  }

  toggleAreYousuredialogDialog = (item) => {
    this.setState({
      AreYousuredialog: !this.state.AreYousuredialog,

      selectedTodelete: item,
    });
  };

  enterEdit = (item) => {
    console.log(item);
    this.setState({
      openFormEdit: true,
      editItem: item,
    });
  };

  //TODO : fix delete
  remove = async (item) => {
    if (this.state.selectedTodelete !== {}) {
      console.log("deleted", this.state.selectedTodelete);
      const res = await DeleteTenant(this.state.selectedTodelete.tenantId);
    }
    // const { data } = await GetAllTenants();
    // this.setState({
    //   data: data,
    // });
  };

  handleSubmitEdit = async (event) => {
    console.log(event);
    // const res = await UpdateTenant(event.tenantId, event);
    // const { data } = await GetAllTenants();
    this.setState({
      //data: data,
      openFormEdit: false,
    });
  };

  handleSubmitAdd = async (event) => {
    //TODO : ADDTenantIamge
    console.log(event);
    // const res = await CreateTenant(event);
    // const { data } = await GetAllTenants();
    this.setState({
      // data: data,
      openFormAdd: false,
    });
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
        <TenantTitles title={"categories"} />
        <hr />
        <div className="card-component">
          <Grid
            style={{ height: "500px" }}
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
                selected: item.tenantId === this.state.selectedID,
              })),
              this.state.dataState
            )}
            {...this.state.dataState}
            onDataStateChange={(e) => {
              this.setState({ dataState: e.dataState });
            }}
            onRowClick={(e) => {
              this.setState({ selectedID: e.dataItem.tenantId });
            }}
          >
            <GridToolbar>
              <button
                title={"Add New Tenant"}
                className="k-button k-primary"
                onClick={() => {
                  this.setState({ openFormAdd: true });
                }}
              >
                + Add new
              </button>

              {this.state.openFormAdd && (
                <AddOrEditTenantForm
                  cancelEdit={this.handleCancelAdd}
                  onSubmit={this.handleSubmitAdd}
                  item={{}}
                  title={"Add New Tenant"}
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
            {/* <Column field="tenantId" title="tenantId" width="100px" /> */}
            <Column field="tenantName" title="Tenant Name" width="150px" />
            <Column field="isActive" title="Is Active" width="150px" />
            <Column field="maxNumberOfClients" title="#Clients" width="150px" />
            <Column
              field="maxNumberOfDepartments"
              title="#Departments"
              width="150px"
            />
            <Column field="maxNumberOfUsers" title="#Users" width="150px" />
            <Column field="tenantMobile" title="Mobile" width="150px" />
            <Column field="tenantTelephone" title="Telephone" width="150px" />
            <Column field="tenantFax" title="Fax" width="150px" />
            <Column field="tenantAddress" title="Address" width="150px" />
            <Column
              cell={this.ActionCommandCell}
              width="100px"
              locked={true}
              filterable={false}
            />
          </Grid>
          {this.state.openFormEdit && (
            <AddOrEditTenantForm
              cancelEdit={this.handleCancelEdit}
              onSubmit={this.handleSubmitEdit}
              item={this.state.editItem}
              title={"Edit Tenant"}
            />
          )}
        </div>
      </CardContainer>
    );
  }
}
export default AdminCategories;
