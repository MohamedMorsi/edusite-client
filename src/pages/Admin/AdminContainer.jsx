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
import Dashboard from "./../Dashboard";
import Planning from "./../Planning";
import Profile from "./../Profile";
import Info from "./../Info";

class AdminContainer extends Component {
  state = {};
  render() {
    return (
      <AdminDrawerRouterContainer {...this.props}>
        <Switch>
          <Route exact={true} path="/" component={Dashboard} />
          <Route exact={true} path="/planning" component={Planning} />
          <Route exact={true} path="/profile" component={Profile} />
          <Route exact={true} path="/info" component={Info} />

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
        </Switch>
      </AdminDrawerRouterContainer>
    );
  }
}

export default AdminContainer;
