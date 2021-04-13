import React from "react";

import { withRouter } from "react-router-dom";
import {
  registerForLocalization,
  provideLocalizationService,
} from "@progress/kendo-react-intl";
import {
  Drawer,
  DrawerContent,
  DrawerItem,
} from "@progress/kendo-react-layout";
import { Header } from "../Header.jsx";

import { SvgIcon } from "@progress/kendo-react-common";
import {
  myspaceBoxIcon,
  alignToGridIcon,
  borderTopIcon,
  cellsMergeVerticallyIcon,
} from "@progress/kendo-svg-icons";

const items = [
  {
    name: "categories",
    iconSvg: "fas fa-school",
    route: "/admin/categories",
  },
  {
    name: "plans",
    iconSvg: "fas fa-hotel",
    route: "/admin/plans",
  },
  {
    name: "courses",
    iconSvg: "fas fa-chalkboard",
    route: "/admin/courses",
  },
  {
    name: "grades",
    iconSvg: "fas fa-graduation-cap",
    route: "/admin/grades",
  },
  {
    name: "teachers",
    iconSvg: "fas fa-chalkboard-teacher",
    route: "/admin/teachers",
  },
  {
    name: "students",
    iconSvg: "fas fa-user-graduate",
    route: "/admin/students",
  },
  { separator: true },
  {
    name: "dashboard",
    iconSvg: "k-icon dashboard-icon",
    selected: true,
    route: "/",
  },
  { name: "planning", iconSvg: "k-icon planning-icon", route: "/planning" },
  { name: "profile", iconSvg: "k-icon profile-icon", route: "/profile" },
  // { separator: true },

  // { name: "info", iconSvg: "k-icon info-icon", route: "/info" },
  // {
  //   name: "dashboard",
  //   iconSvg: "k-icon dashboard-icon",
  //   selected: true,
  //   route: "/admin/dashboard",
  // },
  // {
  //   name: "users",
  //   iconSvg: "fas fa-users",
  //   route: "/admin/users",
  // },
  // {
  //   name: "tenants",
  //   iconSvg: "fas fa-store",
  //   route: "/admin/tenants",
  // },
  // {
  //   name: "services",
  //   iconSvg: "fas fa-taxi",
  //   route: "/admin/services",
  // },
  // {
  //   name: "teachers",
  //   iconSvg: "fas fa-taxi",
  //   route: "/admin/teachers",
  // },
  // {
  //   name: "students",
  //   iconSvg: "fas fa-taxi",
  //   route: "/admin/students",
  // },
  // {
  //   name: "grades",
  //   iconSvg: "fas fa-taxi",
  //   route: "/admin/grades",
  // },
  // {
  //   name: "courses",
  //   iconSvg: "fas fa-taxi",
  //   route: "/admin/courses",
  // },

  // { separator: true },
  // { name: "clients", iconSvg: "fas fa-users", route: "/tenant/clients" },
];

const CustomDrawerItem = (props) => {
  const { iconSvg, text, ...others } = props;
  if (typeof iconSvg === "string" || props.separator === true) {
    return (
      <DrawerItem {...others}>
        <span
          className={iconSvg}
          style={{
            width: " 20px",
            height: "25px",
            paddingTop: "4px",
            marginLeft: "7px",
            marginRight: "7px",
          }}
        />
        <span className="k-item-text">{text}</span>
      </DrawerItem>
    );
  } else {
    return (
      <DrawerItem {...others}>
        <SvgIcon
          icon={iconSvg.svgp}
          size="medium"
          style={{
            width: " 20px",
            height: "25px",
            paddingTop: "4px",
            marginLeft: "7px",
            marginRight: "7px",
          }}
        />
        <span className="k-item-text">{text}</span>
      </DrawerItem>
    );
  }
};

class AdminDrawerRouterContainer extends React.Component {
  state = {
    expanded: true,
    selectedId: items.findIndex((x) => x.selected === true),
    isSmallerScreen: window.innerWidth < 768,
  };

  componentDidMount() {
    window.addEventListener("resize", this.resizeWindow);
    this.resizeWindow();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeWindow);
  }

  resizeWindow = () => {
    this.setState({ isSmallerScreen: window.innerWidth < 768 });
  };

  handleClick = () => {
    this.setState((e) => ({ expanded: !e.expanded }));
  };

  handleSelect = (e) => {
    this.setState({ selectedId: e.itemIndex, expanded: true });
    //console.log(e.itemTarget);
    this.props.history.push(e.itemTarget.props.route);
  };

  getSelectedItem = (pathName) => {
    let currentPath = items.find((item) => item.route === pathName);
    if (currentPath.name) {
      return currentPath.name;
    }
  };
  render() {
    //console.log(this.props.location.pathname);
    let selected = this.getSelectedItem(this.props.location.pathname);
    const localizationService = provideLocalizationService(this);

    return (
      <React.Fragment>
        <Header
          onButtonClick={this.handleClick}
          page={localizationService.toLanguageString(`custom.${selected}`)}
          {...this.props}
        />
        <Drawer
          expanded={this.state.expanded}
          animation={{ duration: 100 }}
          items={items.map((item) => ({
            ...item,
            text: localizationService.toLanguageString(`custom.${item.name}`),
            selected: item.name === selected,
          }))}
          item={CustomDrawerItem}
          position="start"
          mode={this.state.isSmallerScreen ? "overlay" : "push"}
          mini={this.state.isSmallerScreen ? false : true}
          onOverlayClick={this.handleClick}
          onSelect={this.handleSelect}
        >
          <DrawerContent>{this.props.children}</DrawerContent>
        </Drawer>
      </React.Fragment>
    );
  }
}

registerForLocalization(AdminDrawerRouterContainer);

export default withRouter(AdminDrawerRouterContainer);
