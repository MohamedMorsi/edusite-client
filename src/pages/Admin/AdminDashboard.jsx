import * as React from "react";
import { useLocalization } from "@progress/kendo-react-intl";
import CardContainer from "../../components/CardContainer";
import { GridColumn as Column } from "@progress/kendo-react-grid";

const AdminDashboard = () => {
  const localizationService = useLocalization();

  const isChartChangeRef = React.useRef(false);

  React.useEffect(() => {
    isChartChangeRef.current = false;
  });

  return (
    <CardContainer>
      <h3 className="card-title">
        {localizationService.toLanguageString("custom.dashboard")}
      </h3>
    </CardContainer>
  );
};

export default AdminDashboard;
