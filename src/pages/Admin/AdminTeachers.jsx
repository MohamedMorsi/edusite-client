import * as React from "react";
import CardContainer from "../../components/CardContainer";
import { process } from "@progress/kendo-data-query";
import {
  Grid,
  GridColumn as Column,
  GridToolbar,
} from "@progress/kendo-react-grid";
import AdminTitles from "./AdminTitles";
import AddOrEditTeacherForm from "../../components/admin/AddOrEditTeacherForm";
import EditCommandCell from "../../components/EditCommandCell";
import ActiveAndDisableCommandCell from "./../../components/ActiveAndDisableCommandCell";
import {
  GetAllTeachers,
  CreateTeacher,
  UpdateTeacher,
  DeleteTeacher,
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
    const promise = await GetAllTeachers();
    promise == undefined
      ? this.setState({ data: [] })
      : this.setState({ data: promise.data });
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
      const res = await DeleteTeacher(this.state.selectedTodelete.teacherId);
    }
    const { data } = await GetAllTeachers();
    this.setState({
      data: data,
    });
  };

  handleSubmitEdit = async (event) => {
    console.log(event);
    const res = await UpdateTeacher(event.teacherId, event);
    const { data } = await GetAllTeachers();
    this.setState({
      data: data,
      openFormEdit: false,
    });
  };

  handleSubmitAdd = async (event) => {
    console.log(event);
    const res = await CreateTeacher(event);
    const { data } = await GetAllTeachers();
    this.setState({
      data: data,
      openFormAdd: false,
    });
  };

  ActiveAndDisable = async (item) => {
    console.log(item);
    item.isActive = item.isActive === true ? false : true;
    const res = await UpdateTeacher(item.teacherId, item);
    const { data } = await GetAllTeachers();
    this.setState({
      data: data,
    });
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
        <AdminTitles title={"teachers"} />
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
                selected: item.teacherId === this.state.selectedID,
              })),
              this.state.dataState
            )}
            {...this.state.dataState}
            onDataStateChange={(e) => {
              this.setState({ dataState: e.dataState });
            }}
            onRowClick={(e) => {
              this.setState({ selectedID: e.dataItem.teacherId });
            }}
          >
            <GridToolbar>
              <button
                title={"Add New Teacher"}
                className="k-button k-primary"
                onClick={() => {
                  this.setState({ openFormAdd: true });
                }}
              >
                + Add new
              </button>

              {this.state.openFormAdd && (
                <AddOrEditTeacherForm
                  cancelEdit={this.handleCancelAdd}
                  onSubmit={this.handleSubmitAdd}
                  item={{}}
                  title={"Add New Teacher"}
                />
              )}
            </GridToolbar>

            <Column
              field="teacherId"
              title="#"
              width="50px"
              locked={true}
              filterable={false}
            />
            <Column field="username" title="Username" />
            <Column field="firstName" title="First Name" />
            <Column field="lastName" title="Last Name" />
            <Column field="mobilePhone" title="Mobile Phone" />
            <Column field="mobilePhone2" title="Mobile Phone2" />
            <Column field="email" title="Email" />
            <Column field="address" title="Address" />
            <Column field="teachersGradesCount" title="#Grades" />
            <Column field="teachersStudentsCount" title="#Students" />
            <Column field="teachersCoursesCount" title="#Courses" />
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
            <AddOrEditTeacherForm
              cancelEdit={this.handleCancelEdit}
              onSubmit={this.handleSubmitEdit}
              item={this.state.editItem}
              title={"Edit Teacher"}
            />
          )}
        </div>
      </CardContainer>
    );
  }
}
export default AdminCategories;
