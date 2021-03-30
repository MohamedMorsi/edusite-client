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

import { SvgIcon } from "@progress/kendo-react-common";
import {
  myspaceBoxIcon,
  alignToGridIcon,
  borderTopIcon,
  cellsMergeVerticallyIcon,
} from "@progress/kendo-svg-icons";

import { Header } from "./Header.jsx";

const items = [
  {
    name: "dashboard",
    iconSvg: "k-icon dashboard-icon",
    selected: true,
    route: "/",
  },
  { name: "planning", iconSvg: "k-icon planning-icon", route: "/planning" },
  { name: "profile", iconSvg: "k-icon profile-icon", route: "/profile" },
  { separator: true },
  { name: "info", iconSvg: "k-icon info-icon", route: "/info" },
  {
    name: "profile",
    iconSvg: { svgp: alignToGridIcon },
    route: "/info",
  },
  {
    name: "profile",
    iconSvg: "fas fa-barcode",
    route: "/info",
  },
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

class DrawerRouterContainer extends React.Component {
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
    this.props.history.push(e.itemTarget.props.route);
  };

  getSelectedItem = (pathName) => {
    let currentPath = items.find((item) => item.route === pathName);
    if (currentPath.name) {
      return currentPath.name;
    }
  };
  render() {
    let selected = this.getSelectedItem(this.props.location.pathname);
    const localizationService = provideLocalizationService(this);

    return (
      <React.Fragment>
        <Header
          onButtonClick={this.handleClick}
          page={localizationService.toLanguageString(`custom.${selected}`)}
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

registerForLocalization(DrawerRouterContainer);

export default withRouter(DrawerRouterContainer);
