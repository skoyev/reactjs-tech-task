import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import FieldInput from '../common/FieldInput';
import SelectInput from '../common/SelectInput'

export const EmployeeForm = ({ handleSubmit, pristine, reset, submitting, heading, departments, handleSave, handleCancel }) => {
    return (
        <form onSubmit={handleSubmit(handleSave)}>
            <h1>{heading}</h1>

            <Field
                type="text"
                name="firstName"
                label="First Name"
                placeholder="Person First Name"
                component={FieldInput}
            />

            <Field
                type="text"
                name="lastName"
                label="Last Name"
                placeholder="Person Last Name"
                component={FieldInput}
            />

            <Field
                name="departmentId"
                label="Person Department"
                options={departments}
                component={SelectInput}/>

            <div>
                <button type="submit" disabled={submitting} className="btn btn-primary"><i className="fa fa-paper-plane-o" aria-hidden="true" /> Submit</button>

                {heading === 'Add' && <button type="button" disabled={pristine || submitting} onClick={reset} className="btn btn-default btn-space">Clear Values</button>}

                <button type="button" className="btn btn-default btn-space" onClick={handleCancel}>Cancel</button>
            </div>
        </form>
    );
};

const validate = values => {
    const errors = {};

    if (!values.title) {
        errors.title = 'Required';
    }

    return errors;
};

EmployeeForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    heading: PropTypes.string.isRequired,
    handleSave: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired
};

export default reduxForm({
    form: 'EmployeeForm',
    validate
})(EmployeeForm);
