import * as React from "react";
import CardContainer from "../../components/CardContainer";
import { process } from "@progress/kendo-data-query";
import {
  Grid,
  GridColumn as Column,
  GridToolbar,
} from "@progress/kendo-react-grid";
import AdminTitles from "./AdminTitles";
import AddOrEditCourseForm from "../../components/admin/AddOrEditCourseForm";
import EditCommandCell from "../../components/EditCommandCell";
import ActiveAndDisableCommandCell from "../../components/ActiveAndDisableCommandCell";
import {
  GetAllCourses,
  CreateCourse,
  UpdateCourse,
  DeleteCourse,
} from "../../api/adminApi.js";

const dataState = {
  sort: [{ field: "code", dir: "asc" }],
  take: 10,
  skip: 0,
};

class AdminCourses extends React.Component {
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
    const promise = await GetAllCourses();
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
    this.setState({
      openFormEdit: true,
      editItem: item,
    });
  };

  remove = async (item) => {
    if (this.state.selectedTodelete !== {}) {
      console.log("deleted", this.state.selectedTodelete);
      const res = await DeleteCourse(this.state.selectedTodelete.id);
    }
    const { data } = await GetAllCourses();
    this.setState({
      data: data,
    });
  };

  handleSubmitEdit = async (event) => {
    console.log(event);
    event.gradeId = event.grade.id;
    const res = await UpdateCourse(event.id, event);
    const { data } = await GetAllCourses();
    this.setState({
      data: data,
      openFormEdit: false,
    });
  };

  handleSubmitAdd = async (event) => {
    console.log(event);
    event.gradeId = event.grade.id;
    const res = await CreateCourse(event);
    const { data } = await GetAllCourses();
    this.setState({
      data: data,
      openFormAdd: false,
    });
  };

  ActiveAndDisable = async (item) => {
    console.log(item);
    item.isActive = item.isActive === true ? false : true;
    const res = await UpdateCourse(item.id, item);
    const { data } = await GetAllCourses();
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
        <AdminTitles title={"courses"} />
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
                title={"Add New Course"}
                className="k-button k-primary"
                onClick={() => {
                  this.setState({ openFormAdd: true });
                }}
              >
                + Add new
              </button>

              {this.state.openFormAdd && (
                <AddOrEditCourseForm
                  cancelEdit={this.handleCancelAdd}
                  onSubmit={this.handleSubmitAdd}
                  item={{}}
                  title={"Add New Course"}
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
            <Column field="courseName" title="Course Name" />
            <Column field="grade.gradeName" title="Grade" />
            <Column field="teachersCoursesCount" title="# Teachers" />
            <Column field="studentsCoursesCount" title="# Students" />
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
            <AddOrEditCourseForm
              cancelEdit={this.handleCancelEdit}
              onSubmit={this.handleSubmitEdit}
              item={this.state.editItem}
              title={"Edit Course"}
            />
          )}
        </div>
      </CardContainer>
    );
  }
}
export default AdminCourses;
