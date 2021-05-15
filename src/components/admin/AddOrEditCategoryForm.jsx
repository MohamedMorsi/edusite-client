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

const AddOrEditCategoryForm = (props) => {
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
              id={"categoryName"}
              name={"categoryName"}
              label={"Category Name"}
              component={FormInput}
              validator={requiredValidator}
              minLength={2}
              // pattern={"[A-Za-z]+"}
            />

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

export default AddOrEditCategoryForm;
