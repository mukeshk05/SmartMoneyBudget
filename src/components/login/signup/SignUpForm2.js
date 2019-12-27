import React, { useCallback, useState } from 'react';
import _ from 'lodash';
import {Form, Button, Steps, Modal} from 'antd';
import FormBuilder from 'antd-form-builder';
const { Step } = Steps;


const MOCK_USERNAMES = {
    nate: true,
    bood: true,
    kevin: true,
};

const SignUpForm2=Form.create()(({visible, onCancel, onCreate, form }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const handleSubmit = useCallback(
        evt => {
            evt.preventDefault();
            console.log('Submit: ', form.getFieldsValue())
        },
        [form],
    );

    const meta = [
        {
            key: 'username',
            label: 'Username',
            extra: 'Note: username nate, bood or kevin already exist',
            hasFeedback: true, // Show validation status icon in the right
            required: true, // this adds an entry to rules: [{ required: true, message: 'Username is required' }]
            rules: [
                {
                    validator: (rule, value, callback) => {
                        // Do async validation to check if username already exists
                        // Use setTimeout to emulate api call
                        setTimeout(() => {
                            if (MOCK_USERNAMES[value]) {
                                callback(new Error(`Username "${value}" already exists.`))
                            } else {
                                callback()
                            }
                        }, 1000)
                    },
                },
            ],
        },
        {
            key: 'password',
            label: 'Password',
            widget: 'password',
            onChange: () => {
                if (form.isFieldTouched('confirmPassword')) {
                    form.validateFields(['confirmPassword'])
                }
            },
            rules: [
                // This is equivalent with "required: true"
                {
                    required: true,
                    message: 'Password is required',
                },
            ],
        },
        {
            key: 'confirmPassword',
            label: 'Confirm Passowrd',
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
    ];

    const wizardMeta = {
        steps: [
            {
                title: 'Personal Information',
                formMeta: {
                    columns: 2,
                    fields: [
                        { key: 'name.first', label: 'First Name', initialValue: 'Nate', required: true },
                        { key: 'name.last', label: 'Last Name', initialValue: 'Wang', required: true },
                        { key: 'dob', label: 'Date of Birth', widget: 'date-picker', viewWidget: 'date-view' },
                        {
                            key: 'noAccountInfo',
                            label: 'No Account Info',
                            widget: 'switch',
                            tooltip: 'Switch on to remove account step',
                        },
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
                            rules: [{ type: 'email', message: 'Invalid email' }],
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
                            key: 'password',
                            label: 'Password',
                            widget: 'password',
                            onChange: () => {
                                if (form.isFieldTouched('confirmPassword')) {
                                    form.validateFields(['confirmPassword'])
                                }
                            },
                            rules: [
                                // This is equivalent with "required: true"
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

    // Clone the meta for dynamic change
    const newWizardMeta = JSON.parse(JSON.stringify(wizardMeta));

    if (form.getFieldValue('noAccountInfo')) {
        _.pullAt(newWizardMeta.steps, 1)
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

    const handleNext = () => {
        form.validateFields(err => {
            if (err) return;
            setCurrentStep(currentStep + 1)
        })
    };
    const handleBack = () => {
        form.validateFields(err => {
            if (err) return;
            setCurrentStep(currentStep - 1)
        })
    };
    const isReview = currentStep === stepsLength - 1;
    return (
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
                    meta={meta}
                />
            </div>
            <Form.Item className="form-footer" style={{ textAlign: 'right' }}>
                {currentStep > 0 && (
                    <Button onClick={handleBack} style={{ float: 'left', marginTop: '5px' }}>
                        Back
                    </Button>
                )}
                <Button>Cancel</Button>&nbsp; &nbsp;
                <Button type="primary" onClick={isReview ? handleSubmit : handleNext}>
                    {isReview ? 'Submit' : 'Next'}
                </Button>
            </Form.Item>
        </Form>
        </Modal>
    )
});
export default SignUpForm2;