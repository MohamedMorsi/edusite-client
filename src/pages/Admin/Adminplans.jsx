import * as React from "react";
import CardContainer from "../../components/CardContainer";
import { process } from "@progress/kendo-data-query";
import {
  Grid,
  GridColumn as Column,
  GridToolbar,
} from "@progress/kendo-react-grid";
import TenantTitles from "./AdminTitles";
import AddOrEditTenantForm from "../../components/admin/AddOrEditTenantForm";
import EditCommandCell from "../../components/EditCommandCell";
import ActiveAndDisableCommandCell from "../../components/ActiveAndDisableCommandCell";
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

class Adminplans extends React.Component {
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
    const data = [
      {
        id: 1,
        planName: "annual",
        months: 12,
        cost: 10000,
        maxCoursesNumbers: 6,
        maxStudentsNumber: 500,
        isActive: true,
      },
      {
        id: 2,
        planName: "midterm",
        months: 6,
        cost: 5000,
        maxCoursesNumbers: 6,
        maxStudentsNumber: 300,
        isActive: true,
      },
      {
        id: 3,
        planName: "quarterly",
        months: 3,
        cost: 2500,
        maxCoursesNumbers: 6,
        maxStudentsNumber: 100,
        isActive: true,
      },
    ];
    this.setState({ data: data });
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
    // console.log(item);
    this.setState({
      openFormEdit: true,
      editItem: item,
    });
  };

  remove = async (item) => {
    if (this.state.selectedTodelete !== {}) {
      console.log("deleted", this.state.selectedTodelete);
      //const res = await DeleteTenant(this.state.selectedTodelete.tenantId);
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
    console.log(event);
    // const res = await CreateTenant(event);
    // const { data } = await GetAllTenants();
    this.setState({
      // data: data,
      openFormAdd: false,
    });
  };

  ActiveAndDisable = async (item) => {
    if (item.isActive === true) {
      //const res = await OpenBox(item.id);
    } else {
      //const res = await CloseBox(item.id);
    }
  };

  toggleSwitch = (item) => {
    this.ActiveAndDisable(item);
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
  ActionopenCloseCommandCell = (props) => (
    <ActiveAndDisableCommandCell {...props} toggleSwitch={this.toggleSwitch} />
  );
  render() {
    return (
      <CardContainer>
        <TenantTitles title={"plans"} />
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
                selected: item.id === this.state.selectedID,
              })),
              this.state.dataState
            )}
            {...this.state.dataState}
            onDataStateChange={(e) => {
              this.setState({ dataState: e.dataState });
            }}
            onRowClick={(e) => {
              this.setState({ selectedID: e.dataItem.id });
            }}
          >
            <GridToolbar>
              <button
                title={"Add New Category"}
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
                  title={"Add New Category"}
                />
              )}
            </GridToolbar>

            <Column
              field="id"
              title="#"
              width="50px"
              locked={true}
              filterable={false}
            />
            <Column field="planName" title="Name" />
            <Column field="cost" title="cost" />
            <Column field="maxCoursesNumbers" title="max #Courses" />
            <Column field="maxStudentsNumber" title="max #Students" />
            <Column field="months" title="#months" />
            <Column
              title="Is Active"
              cell={this.ActionopenCloseCommandCell}
              width="100px"
              locked={true}
            />
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
              title={"Edit Category"}
            />
          )}
        </div>
      </CardContainer>
    );
  }
}
export default Adminplans;
