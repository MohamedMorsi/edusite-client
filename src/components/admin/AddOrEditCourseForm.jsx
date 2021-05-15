import React, { Component, useState } from "react";
import { Dialog } from "@progress/kendo-react-dialogs";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import { useLocalization } from "@progress/kendo-react-intl";
import { numValidator } from "../../validators/validators";
import { nameValidator, requiredValidator } from "../../validators/validators";
import { DropDownList } from "../form/DropDownList";

import {
  FormInput,
  FormSwitch,
  FormTextArea,
  FormNumericTextBox,
} from "../form/form-components";
import { GetAllActiveGrades } from "../../api/adminApi.js";

let grades = [];

const AddOrEditCourseForm = (props) => {
  const localizationService = useLocalization();

  const handelgrades = async () => {
    grades = await (await GetAllActiveGrades()).data;
  };
  handelgrades();

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
              id={"courseName"}
              name={"courseName"}
              label={"Course Name"}
              component={FormInput}
              validator={requiredValidator}
              minLength={2}
              // pattern={"[A-Za-z]+"}
            />

            <Field
              id={"grade"}
              name={"grade"}
              label={"Grade"}
              textField={"gradeName"}
              dataItemKey={"id"}
              data={grades}
              component={DropDownList}
              validator={requiredValidator}
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

export default AddOrEditCourseForm;
