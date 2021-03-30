import React, { Component } from "react";

import {
  HashRouter,
  Switch,
  Route,
  Redirect,
  BrowserRouter,
} from "react-router-dom";
import AdminDrawerRouterContainer from "../../components/admin/AdminDrawerRouterContainer.jsx";

import AdminDashboard from "./AdminDashboard";
import AdminUsers from "./AdminUsers";
import AdminTenants from "./AdminTenants";
import AdminServices from "./AdminServices";
import Teachers from "./Teachers";
import Students from "./Students";
import Grades from "./Grades";
import Courses from "./Courses";
import Dashboard from "./../Dashboard";
import Planning from "./../Planning";
import Profile from "./../Profile";
import Info from "./../Info";
import Login from "./../Login/Login";
import NotFound from "./../NotFound";

class AdminContainer extends Component {
  state = {};
  render() {
    return (
      <AdminDrawerRouterContainer {...this.props}>
        <Switch>
          <Route exact={true} path="/" component={Dashboard} />
          <Route exact={true} path="/planning" component={Planning} />
          <Route exact={true} path="/profile" component={Profile} />
          {/* <Route exact={true} path="/info" component={Info} /> */}

          <Route
            exact={true}
            path="/admin/dashboard"
            component={AdminDashboard}
          />

          <Route exact={true} path="/admin/users" component={AdminUsers} />

          <Route exact={true} path="/admin/tenants" component={AdminTenants} />

          <Route
            exact={true}
            path="/admin/services"
            component={AdminServices}
          />
          <Route exact={true} path="/admin/teachers" component={Teachers} />
          <Route exact={true} path="/admin/students" component={Students} />
          <Route exact={true} path="/admin/grades" component={Grades} />
          <Route exact={true} path="/admin/courses" component={Courses} />

          {/* <Route path="/login" exact={true} component={Login} /> */}
          {/* <Route path="/notfound" exact={true} component={NotFound} /> */}
          {/* <Redirect from="/" to="/login" /> */}
          <Redirect to="/notfound" />
        </Switch>
      </AdminDrawerRouterContainer>
    );
  }
}

export default AdminContainer;
