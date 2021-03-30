import * as React from "react";
import { useLocalization } from "@progress/kendo-react-intl";
import CardContainer from "../../components/CardContainer";
import { GridColumn as Column } from "@progress/kendo-react-grid";

const AdminServices = () => {
  const localizationService = useLocalization();

  const isChartChangeRef = React.useRef(false);

  React.useEffect(() => {
    isChartChangeRef.current = false;
  });

  return (
    <CardContainer>
      <h3 className="card-title">
        {localizationService.toLanguageString("custom.services")}
      </h3>
    </CardContainer>
  );
};

export default AdminServices;
