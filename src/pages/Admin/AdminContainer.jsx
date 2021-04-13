import React, { Component } from "react";

import {
  HashRouter,
  Switch,
  Route,
  Redirect,
  BrowserRouter,
} from "react-router-dom";
import AdminDrawerRouterContainer from "../../components/admin/AdminDrawerRouterContainer.jsx";

import AdminCategories from "./AdminCategories";
import Dashboard from "./../Dashboard";
import Planning from "./../Planning";
import Profile from "./../Profile";
import AdminCourses from "./AdminCourses";
import AdminGrades from "./AdminGrades";
import AdminTeachers from "./AdminTeachers";
import AdminStudents from "./AdminStudents";
import Adminplans from "./Adminplans";

class AdminContainer extends Component {
  state = {};
  render() {
    return (
      <AdminDrawerRouterContainer {...this.props}>
        <Switch>
          <Route
            exact={true}
            path="/admin/categories"
            component={AdminCategories}
          />
          <Route exact={true} path="/admin/plans" component={Adminplans} />
          <Route exact={true} path="/admin/courses" component={AdminCourses} />
          <Route exact={true} path="/admin/grades" component={AdminGrades} />
          <Route
            exact={true}
            path="/admin/teachers"
            component={AdminTeachers}
          />
          <Route
            exact={true}
            path="/admin/students"
            component={AdminStudents}
          />

          <Route exact={true} path="/" component={Dashboard} />
          <Route exact={true} path="/planning" component={Planning} />
          <Route exact={true} path="/profile" component={Profile} />
        </Switch>
      </AdminDrawerRouterContainer>
    );
  }
}

export default AdminContainer;
