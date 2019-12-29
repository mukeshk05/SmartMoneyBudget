import React from "react";
import _ from "lodash";
import {Form, Button, Steps, Modal, Upload} from "antd";
import FormBuilder from "antd-form-builder";
const { Step } = Steps;
const DateView = ({ value }) => (value ? value.format("MMM Do YYYY") : "N/A");
FormBuilder.defineWidget("date-view", DateView);

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0
    };
    //this.onChange = this.onChange.bind(this)
  }
  setCurrentStep = value => {
    this.setState({ currentStep: value });
  };

  handleNext = () => {
    const form = this.props.form;
    form.validateFields(err => {
      if (err) return;
      this.setCurrentStep(this.state.currentStep + 1);
    });
  };
  handleBack = () => {
    const form = this.props.form;
    form.validateFields(err => {
      if (err) return;
      this.setCurrentStep(this.state.currentStep - 1);
    });
  };

  render() {
    const { currentStep } = this.state;
    const { visible, onCancel, onCreate, form } = this.props;

    const formSteps = [
      {
        0: {
          columns: 2,
          fields: [
            {
              key: "name.first",
              label: "First Name",
              initialValue: "",
              required: true
            },
            {
              key: "name.last",
              label: "Last Name",
              initialValue: "",
              required: true
            },
            {
              key: "dob",
              label: "Date of Birth",
              widget: "date-picker",
              viewWidget: "date-view",
              required: true
            }
          ]
        },
        1: {
          columns: 2,
          fields: [
            {
              key: "email",
              label: "Email",
              clear: "right",
              required: true,
              hasFeedback: true,
              rules: [{ type: "email", message: "Invalid email" }]
            },
            {
              key: "password",
              label: "Password",
              widget: "password",
              onChange: () => {
                if (form.isFieldTouched("confirmPassword")) {
                  form.validateFields(["confirmPassword"]);
                }
              },
              rules: [
                // This is equivalent with "required: true"
                {
                  required: true,
                  message: "Password is required"
                }
              ]
            },
            {
              key: "confirmPassword",
              label: "Confirm Passowrd",
              widget: "password",
              required: true,
              rules: [
                {
                  validator: (rule, value, callback) => {
                    if (value !== form.getFieldValue("password")) {
                      callback(new Error("Two passwords are inconsistent."));
                    } else {
                      callback();
                    }
                  }
                }
              ]
            },
            {
              key: "security",
              label: "Security Question",
              widget: "select",
              placeholder: "Select a question...",
              options: ["What's your pet's name?", "Your nick name?"]
            },
            { key: "answer", label: "Security Answer" },
            {
              key: "noAccountInfo",
              label: "No Contact Info",
              widget: "switch",
              tooltip: "Switch on to remove Contact Information Step"
            }
          ]
        },
        2: {
          columns: 2,
          fields: [
            { key: "address", label: "Address", colSpan: 2 },
            { key: "city", label: "City" },
            { key: "phone", label: "phone" }
          ]
        }
      }
    ];

    const wizardMeta = {
      steps: [
        {
          title: "Personal Information"
        },
        {
          title: "Account Information"
        },
        {
          title: "Contact Information"
        }
      ]
    };

    const newWizardMeta = JSON.parse(JSON.stringify(wizardMeta));

    if (form.getFieldValue("noAccountInfo")) {
      _.pullAt(newWizardMeta.steps, 2);
    }
    const reviewFields = [];
    newWizardMeta.steps.forEach((s, i) => {
      {
        reviewFields.push(
          {
            key: "review" + i,
            colSpan: 2,
            render() {
              return (
                <fieldset>
                  <legend>{s.title}</legend>
                </fieldset>
              );
            }
          },
          ...formSteps[0][i].fields
        );
      }
    });

    newWizardMeta.steps.push({
      key: "review",
      title: "Review",
      formMeta: {
        columns: 2,
        fields: reviewFields
      }
    });

    const temp = [];

    for (let i in formSteps[0]) {
      temp.push(formSteps[0][i]);
    }
    temp.push({ columns: 2, fields: reviewFields });

    const stepsLength = newWizardMeta.steps.length;

    const isReview = currentStep === stepsLength - 1;
    return (
      <Modal
        style={{ top: 10 }}
        width={950}
        visible={visible}
        title="Sign Up"
        okText="Create"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="horizontal" style={{ width: "880px" }}>
          <Steps current={currentStep}>
            {newWizardMeta.steps.map(s => (
              <Step key={s.title} title={s.title} />
            ))}
          </Steps>
          <div
            style={{ background: "#f7f7f7", padding: "20px", margin: "30px 0" }}
          >
            <FormBuilder
              viewMode={currentStep === stepsLength - 1}
              form={form}
              meta={temp[currentStep]}
            />
          </div>
          <Form.Item className="form-footer" style={{ textAlign: "right" }}>
            {currentStep > 0 && (
              <Button
                onClick={this.handleBack}
                style={{ float: "left", marginTop: "5px" }}
              >
                Back
              </Button>
            )}
            {currentStep < 3 ? (
              <Button
                type="primary"
                onClick={isReview ? onCreate : this.handleNext}
              >
                {isReview ? "Submit" : "Next"}
              </Button>
            ) : null}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
export default Form.create()(SignUpForm);