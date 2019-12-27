import React from 'react';
import _ from 'lodash';
import {Form, Button, Steps, Modal} from 'antd';
import FormBuilder from 'antd-form-builder';
const { Step } = Steps;
const DateView = ({ value }) => (value ? value.format('MMM Do YYYY') : 'N/A');

FormBuilder.defineWidget('date-view', DateView);




class SignUpForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            currentStep:0

        };
        //this.onChange = this.onChange.bind(this)


    };
    setCurrentStep=value=>{
        this.setState({currentStep:value})
    };

    handleNext = () => {
        const form=this.props.form;
        form.validateFields(err => {
            if (err) return;
            this.setCurrentStep(this.state.currentStep + 1)
        })
    };
    handleBack = () => {
        const form=this.props.form;
        form.validateFields(err => {
            if (err) return;
            this.setCurrentStep(this.state.currentStep - 1)
        })
    };

    render() {
        const {currentStep } = this.state;
        const {visible, onCancel, onCreate, form} = this.props;


        const wizardMeta = {
            steps: [
                {
                    title: 'Personal Information',
                    formMeta: {
                        columns: 2,
                        fields: [
                            { key: 'name.first', label: 'First Name', initialValue: '', required: true },
                            { key: 'name.last', label: 'Last Name', initialValue: '', required: true },
                            { key: 'dob', label: 'Date of Birth', widget: 'date-picker', viewWidget: 'date-view',required: true },

                        ],
                    },
                },
                {
                    title: 'Account Information',
                    formMeta: {
                        columns: 2,
                        fields: [
                            {
                                key: 'email',
                                label: 'Email',
                                clear: 'right',
                                required: true,
                                hasFeedback: true,
                                rules: [{ type: 'email', message: 'Invalid email' }],
                            },
                            {
                                key: 'password',
                                label: 'Password',
                                widget: 'password',
                                onChange: () => {
                                    alert("Hello");
                                    if (form.isFieldTouched('confirmPassword')) {
                                        form.validateFields(['confirmPassword'])
                                    }
                                },
                                rules: [
                                    {
                                        required: true,
                                        message: 'Password is required',
                                    },
                                ],
                            },
                            {
                                key: 'confirmPassword',
                                label: 'Confirm Password',
                                widget: 'password',
                                required: true,
                                rules: [
                                    {
                                        validator: (rule, value, callback) => {
                                            if (value !== form.getFieldValue('password')) {
                                                callback(new Error('Two passwords are inconsistent.'))
                                            } else {
                                                callback()
                                            }
                                        },
                                    },
                                ],
                            },
                            {
                                key: 'security',
                                label: 'Security Question',
                                widget: 'select',
                                placeholder: 'Select a question...',
                                options: ["What's your pet's name?", 'Your nick name?'],
                            },
                            { key: 'answer', label: 'Security Answer' },
                            {
                                key: 'noAccountInfo',
                                label: 'No Account Info',
                                widget: 'switch',
                                tooltip: 'Switch on to remove Contact Information Step',
                            },
                        ],
                    },
                },
                {
                    title: 'Contact Information',
                    formMeta: {
                        columns: 2,
                        fields: [
                            { key: 'address', label: 'Address', colSpan: 2 },
                            { key: 'city', label: 'City' },
                            { key: 'phone', label: 'phone' },
                        ],
                    },
                },
            ],
        };
        const newWizardMeta = JSON.parse(JSON.stringify(wizardMeta));

        if (form.getFieldValue('noAccountInfo')) {
            _.pullAt(newWizardMeta.steps, 2)
        }

        // Generate a general review step
        const reviewFields = [];
        newWizardMeta.steps.forEach((s, i) => {
            reviewFields.push(
                {
                    key: 'review' + i,
                    colSpan: 2,
                    render() {
                        return (
                            <fieldset>
                                <legend>{s.title}</legend>
                            </fieldset>
                        )
                    },
                },
                ...s.formMeta.fields,
            )
        });

        newWizardMeta.steps.push({
            key: 'review',
            title: 'Review',
            formMeta: {
                columns: 2,
                fields: reviewFields,
            },
        });

        const stepsLength = newWizardMeta.steps.length;


        const isReview = currentStep === stepsLength - 1;
        return(
            <Modal style={{ top: 110,right:200 }}
                width={950}
                visible={visible}
                title="Create a new collection"
                okText="Create"
                onCancel={onCancel}
                onOk={onCreate}

            >
                <Form layout="horizontal" style={{ width: '880px' }}>
                    <Steps current={currentStep}>
                        {newWizardMeta.steps.map(s => (
                            <Step key={s.title} title={s.title} />
                        ))}
                    </Steps>
                    <div style={{ background: '#f7f7f7', padding: '20px', margin: '30px 0' }}>
                        <FormBuilder
                            viewMode={currentStep === stepsLength - 1}
                            form={form}
                            meta={newWizardMeta.steps[currentStep].formMeta}
                        />
                    </div>
                    <Form.Item className="form-footer" style={{ textAlign: 'right' }}>
                        {currentStep > 0 && (
                            <Button onClick={this.handleBack} style={{ float: 'left', marginTop: '5px' }}>
                                Back
                            </Button>
                        )}
                        <Button type="primary" onClick={isReview ? onCreate : this.handleNext}>
                            {isReview ? 'Submit' : 'Next'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        );
    }

}
export default Form.create()(SignUpForm);