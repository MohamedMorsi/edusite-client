import React from "react";

import "./App.scss";

import {
  HashRouter,
  Switch,
  Route,
  Redirect,
  BrowserRouter,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Planning from "./pages/Planning.jsx";
import Profile from "./pages/Profile.jsx";
import DrawerRouterContainer from "./components/DrawerRouterContainer.jsx";
import { AppContext } from "./AppContext";
import { countries } from "./resources/countries";
import {
  IntlProvider,
  load,
  LocalizationProvider,
  loadMessages,
} from "@progress/kendo-react-intl";

import likelySubtags from "cldr-core/supplemental/likelySubtags.json";
import currencyData from "cldr-core/supplemental/currencyData.json";
import weekData from "cldr-core/supplemental/weekData.json";

import frNumbers from "cldr-numbers-full/main/fr/numbers.json";
import frLocalCurrency from "cldr-numbers-full/main/fr/currencies.json";
import frCaGregorian from "cldr-dates-full/main/fr/ca-gregorian.json";
import frDateFields from "cldr-dates-full/main/fr/dateFields.json";

import usNumbers from "cldr-numbers-full/main/en/numbers.json";
import usLocalCurrency from "cldr-numbers-full/main/en/currencies.json";
import usCaGregorian from "cldr-dates-full/main/en/ca-gregorian.json";
import usDateFields from "cldr-dates-full/main/en/dateFields.json";

import esNumbers from "cldr-numbers-full/main/es/numbers.json";
import esLocalCurrency from "cldr-numbers-full/main/es/currencies.json";
import esCaGregorian from "cldr-dates-full/main/es/ca-gregorian.json";
import esDateFields from "cldr-dates-full/main/es/dateFields.json";

import { enMessages } from "./messages/en-US";
import { frMessages } from "./messages/fr";
import { esMessages } from "./messages/es";

import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound";
import AdminContainer from "./pages/Admin/AdminContainer";

load(
  likelySubtags,
  currencyData,
  weekData,
  frNumbers,
  frLocalCurrency,
  frCaGregorian,
  frDateFields,
  usNumbers,
  usLocalCurrency,
  usCaGregorian,
  usDateFields,
  esNumbers,
  esLocalCurrency,
  esCaGregorian,
  esDateFields
);

loadMessages(esMessages, "es");
loadMessages(frMessages, "fr");
loadMessages(enMessages, "en-US");

const App = () => {
  const [contextState, setContextState] = React.useState({
    localeId: "en-US",
    firstName: "Peter",
    lastName: "Douglas",
    middleName: "",
    email: "peter.douglas@progress.com",
    phoneNumber: "(+1) 8373-837-93-02",
    avatar: null,
    country: countries[33].name,
    isInPublicDirectory: true,
    biography: "",
    teamId: 1,
  });
  const onLanguageChange = React.useCallback(
    (event) => {
      setContextState({ ...contextState, localeId: event.value.localeId });
    },
    [contextState, setContextState]
  );
  const onProfileChange = React.useCallback(
    (event) => {
      setContextState({ ...contextState, ...event.dataItem });
    },
    [contextState, setContextState]
  );
  return (
    <div className="App">
      <LocalizationProvider language={contextState.localeId}>
        <IntlProvider locale={contextState.localeId}>
          <AppContext.Provider
            value={{ ...contextState, onLanguageChange, onProfileChange }}
          >
            <HashRouter>
              <BrowserRouter>
                <Switch>
                  {/*   -------------------Admin start-------------------------*/}
                  <Route
                    exact={true}
                    path="/admin/categories"
                    component={AdminContainer}
                  />
                  <Route
                    exact={true}
                    path="/admin/courses"
                    component={AdminContainer}
                  />
                  <Route
                    exact={true}
                    path="/admin/grades"
                    component={AdminContainer}
                  />
                  <Route
                    exact={true}
                    path="/admin/teachers"
                    component={AdminContainer}
                  />
                  <Route
                    exact={true}
                    path="/admin/students"
                    component={AdminContainer}
                  />

                  <Route exact={true} path="/" component={AdminContainer} />
                  <Route
                    exact={true}
                    path="/planning"
                    component={AdminContainer}
                  />
                  <Route
                    exact={true}
                    path="/profile"
                    component={AdminContainer}
                  />
                  {/*   -------------------Admin end -------------------------*/}

                  <Route path="/login" exact={true} component={Login} />
                  <Route path="/notfound" exact={true} component={NotFound} />
                  <Redirect from="/" to="/login" />
                  <Redirect to="/notfound" />
                </Switch>
              </BrowserRouter>
            </HashRouter>
          </AppContext.Provider>
        </IntlProvider>
      </LocalizationProvider>
    </div>
  );
};

export default App;
