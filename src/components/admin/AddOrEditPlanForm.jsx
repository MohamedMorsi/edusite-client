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

const AddOrEditPlanForm = (props) => {
  const localizationService = useLocalization();

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
              id={"planName"}
              name={"planName"}
              label={"Plan Name"}
              component={FormInput}
              validator={requiredValidator}
              minLength={2}
              // pattern={"[A-Za-z]+"}
            />

            <div className="row">
              <div className="col">
                <Field
                  id={"maxStudents"}
                  name={"maxStudents"}
                  label={"Max Number Of Students"}
                  format={"n0"}
                  component={FormNumericTextBox}
                  validator={numValidator}
                />

                <Field
                  id={"cost"}
                  name={"cost"}
                  label={"Cost"}
                  format={"n0"}
                  component={FormNumericTextBox}
                  validator={numValidator}
                />
              </div>
              <div className="col">
                <Field
                  id={"monthsNumber"}
                  name={"monthsNumber"}
                  label={"Max Number Of Months"}
                  format={"n0"}
                  component={FormNumericTextBox}
                  validator={numValidator}
                />
              </div>
            </div>

            {/* <Field
              id={"isActive"}
              name={"isActive"}
              label={"Active"}
              defaultChecked={props.item.isActive}
              component={FormSwitch}
            /> */}

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

export default AddOrEditPlanForm;
