import React from "react";
import { useLocalization } from "@progress/kendo-react-intl";

const AdminTitles = (props) => {
  const localizationService = useLocalization();
  return (
    <h3 className="card-title">
      {localizationService.toLanguageString("custom." + props.title)}
    </h3>
  );
};

export default AdminTitles;
