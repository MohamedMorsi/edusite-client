import React, { Component, useState } from "react";
import { Dialog } from "@progress/kendo-react-dialogs";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import { useLocalization } from "@progress/kendo-react-intl";
import { numValidator } from "../../validators/validators";
import { nameValidator, requiredValidator } from "../../validators/validators";
import {
  FormInput,
  FormSwitch,
  FormTextArea,
  FormNumericTextBox,
} from "../form/form-components";
import { DropDownList } from "../form/DropDownList";

import { GetAllActiveTenants } from "../../api/adminApi.js";
let tenants = [];

const AddOrEditTenantForm = (props) => {
  const localizationService = useLocalization();

  const handeltenants = async () => {
    tenants = await GetAllActiveTenants();
  };
  handeltenants();

  return (
    <Dialog
      style={{ position: "fixed" }}
      title={props.title}
      onClose={props.cancelEdit}
      width={"500px"}
    >
      <Form
        onSubmit={props.onSubmit}
        initialValues={props.item}
        render={(formRenderProps) => (
          <FormElement style={{ maxWidth: 650 }}>
            <legend className={"k-form-legend"}>
              Please fill in the fields:
            </legend>

            <Field
              id={"tenantName"}
              name={"tenantName"}
              label={"TenantName"}
              component={FormInput}
              validator={requiredValidator}
              minLength={2}
              pattern={"[A-Za-z]+"}
            />

            <div className="row">
              <div className="col">
                <Field
                  id={"tenantMobile"}
                  name={"tenantMobile"}
                  label={"Tenant Mobile"}
                  component={FormInput}
                />

                <Field
                  id={"tenantTelephone"}
                  name={"tenantTelephone"}
                  label={"Tenant Telephone"}
                  component={FormInput}
                />
              </div>
              <div className="col">
                <Field
                  id={"tenantFax"}
                  name={"tenantFax"}
                  label={"Fax"}
                  component={FormInput}
                />
              </div>
            </div>

            <div className="row">
              <div className="col">
                <Field
                  id={"maxNumberOfClients"}
                  name={"maxNumberOfClients"}
                  label={"Max number of Clients"}
                  format={"n0"}
                  component={FormNumericTextBox}
                  validator={numValidator}
                />

                <Field
                  id={"maxNumberOfUsers"}
                  name={"maxNumberOfUsers"}
                  label={"Max number of users"}
                  format={"n0"}
                  component={FormNumericTextBox}
                  validator={numValidator}
                />
              </div>
              <div className="col">
                <Field
                  id={"maxNumberOfDepartments"}
                  name={"maxNumberOfDepartments"}
                  label={"Max number of Departments"}
                  format={"n0"}
                  component={FormNumericTextBox}
                  validator={numValidator}
                />
              </div>
            </div>

            <Field
              id={"isActive"}
              name={"isActive"}
              label={"Active"}
              defaultChecked={props.item.isActive}
              component={FormSwitch}
            />

            <Field
              id={"tenantAddress"}
              name={"tenantAddress"}
              label={"Address"}
              optional={true}
              component={FormTextArea}
            />

            <span className={"k-form-separator"} />

            <div className={"k-form-buttons k-buttons-end"}>
              <Button onClick={props.cancelEdit}>
                {localizationService.toLanguageString("custom.cancel")}
              </Button>
              <Button
                primary={true}
                type={"submit"}
                disabled={!formRenderProps.allowSubmit}
              >
                {localizationService.toLanguageString("custom.saveChanges")}
              </Button>
            </div>
          </FormElement>
        )}
      />
    </Dialog>
  );
};

export default AddOrEditTenantForm;
