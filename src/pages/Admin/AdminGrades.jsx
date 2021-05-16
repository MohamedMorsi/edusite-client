import * as React from "react";
import CardContainer from "../../components/CardContainer";
import { process } from "@progress/kendo-data-query";
import {
  Grid,
  GridColumn as Column,
  GridToolbar,
} from "@progress/kendo-react-grid";
import AdminTitles from "./AdminTitles";
import AddOrEditGradeForm from "../../components/admin/AddOrEditGradeForm";
import EditCommandCell from "../../components/EditCommandCell";
import ActiveAndDisableCommandCell from "../../components/ActiveAndDisableCommandCell";
import {
  GetAllGrades,
  CreateGrade,
  UpdateGrade,
  DeleteGrade,
} from "../../api/adminApi.js";

const dataState = {
  sort: [{ field: "code", dir: "asc" }],
  take: 10,
  skip: 0,
};

class AdminGrades extends React.Component {
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
    // const data = [
    //   {
    //     id: 1,
    //     GradeName: "Grade One",
    //     CoursesNums: 5,
    //     isActive: true,
    //   },
    //   {
    //     id: 2,
    //     GradeName: "Grade two",
    //     CoursesNums: 3,
    //     isActive: true,
    //   },
    // ];
    // this.setState({ data: data });
    const promise = await GetAllGrades();
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
      const res = await DeleteGrade(this.state.selectedTodelete.id);
    }
    const { data } = await GetAllGrades();
    this.setState({
      data: data,
    });
  };

  handleSubmitEdit = async (event) => {
    console.log(event);
    const res = await UpdateGrade(event.id, event);
    const { data } = await GetAllGrades();
    this.setState({
      data: data,
      openFormEdit: false,
    });
  };

  handleSubmitAdd = async (event) => {
    console.log(event);
    const res = await CreateGrade(event);
    const { data } = await GetAllGrades();
    this.setState({
      data: data,
      openFormAdd: false,
    });
  };

  ActiveAndDisable = async (item) => {
    console.log(item);
    item.isActive = item.isActive === true ? false : true;
    const res = await UpdateGrade(item.id, item);
    const { data } = await GetAllGrades();
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
        <AdminTitles title={"grades"} />
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
                title={"Add New Grade"}
                className="k-button k-primary"
                onClick={() => {
                  this.setState({ openFormAdd: true });
                }}
              >
                + Add new
              </button>

              {this.state.openFormAdd && (
                <AddOrEditGradeForm
                  cancelEdit={this.handleCancelAdd}
                  onSubmit={this.handleSubmitAdd}
                  item={{}}
                  title={"Add New Grade"}
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
            <Column field="gradeName" title="Grade Name" />
            <Column field="coursesCount" title="# Courses" />
            <Column field="teachersGradesCount" title="# Teachers" />
            <Column field="studentsCount" title="# Students" />
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
            <AddOrEditGradeForm
              cancelEdit={this.handleCancelEdit}
              onSubmit={this.handleSubmitEdit}
              item={this.state.editItem}
              title={"Edit Grade"}
            />
          )}
        </div>
      </CardContainer>
    );
  }
}
export default AdminGrades;
