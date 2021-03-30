import React, { Component, useState } from "react";
import { Dialog } from "@progress/kendo-react-dialogs";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import { useLocalization } from "@progress/kendo-react-intl";
import { numValidator } from "../../validators/validators";
import { nameValidator, requiredValidator } from "../../validators/validators";
import { FormInput, FormSwitch } from "../form/form-components";
import { DropDownList } from "../form/DropDownList";

import { GetAllActiveTenants, GetAllRoles } from "../../api/adminApi.js";
let tenants = [];
let roles = [];

const AddOrEditUserForm = (props) => {
  const localizationService = useLocalization();

  const [password, setpassword] = useState("");
  //const [confirmPassword, setconfirmPassword] = useState("");

  const handeltenants = async () => {
    tenants = await GetAllActiveTenants();
  };
  handeltenants();

  const handelroles = async () => {
    roles = await (await GetAllRoles()).data;
  };
  handelroles();

  //const confirmPasswordValidationMessage = "Passwords does not match!";

  const handleChange = (event) => {
    console.log(event.target.name);
    if (event.target.name == "password") {
      setpassword(event.target.value);
    }
    // if (event.target.name == "confirmPassword") {
    //   setconfirmPassword(event.target.value);
    // }
  };

  return (
    <Dialog
      style={{ position: "fixed" }}
      title={props.title}
      onClose={props.cancelEdit}
      width={"400px"}
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
              id={"userName"}
              name={"userName"}
              label={"UserName"}
              component={FormInput}
              validator={requiredValidator}
              minLength={2}
              pattern={"[A-Za-z]+"}
            />
            <div className="row">
              <div className="col">
                <Field
                  id={"firstName"}
                  name={"firstName"}
                  label={"First Name"}
                  component={FormInput}
                  validator={requiredValidator}
                />
              </div>
              <div className="col">
                <Field
                  id={"lastName"}
                  name={"lastName"}
                  label={"Last Name"}
                  component={FormInput}
                  validator={requiredValidator}
                />
              </div>
            </div>

            <Field
              id={"email"}
              name={"email"}
              label={"Email"}
              component={FormInput}
              validator={requiredValidator}
            />

            <Field
              value={password}
              onChange={handleChange}
              id={"password"}
              name={"password"}
              label={"Password"}
              component={FormInput}
              //validator={requiredValidator}
              type="password"
              minLength={4}
              maxLength={18}
              required={true}
            />
            {/* <Field
              value={confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
              label="Confirm Password"
              component={FormInput}
              //validator={requiredValidator}
              type="password"
              minLength={4}
              maxLength={18}
              validator={password && password === confirmPassword}
              validationMessage={"Passwords does not match!"}
              required={true}
            /> */}

            <Field
              id={"isActive"}
              name={"isActive"}
              label={"Active"}
              defaultChecked={props.item.isActive}
              component={FormSwitch}
            />

            <Field
              id={"role"}
              name={"role"}
              label={"Role"}
              textField={"name"}
              dataItemKey={"id"}
              data={roles}
              component={DropDownList}
              validator={requiredValidator}
              disabled={props.edit}
            />

            <Field
              id={"tenant"}
              name={"tenant"}
              label={"Tenant"}
              textField={"tenantName"}
              dataItemKey={"tenantId"}
              data={tenants}
              component={DropDownList}
              //validator={requiredValidator}
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

export default AddOrEditUserForm;
