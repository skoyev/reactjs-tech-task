import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as employeeAction from '../../action/EmployeeAction';
import * as departmentAction from '../../action/DepartmentAction';
import EmployeeForm from './EmployeeForm';
import { departmentsFormattedForDropdown } from '../../selectors/departmentSelector';

export class AddOrEditEmployeeContainer extends React.Component {

    constructor() {
        super();
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentDidMount() {
        this.props.action.getEmployeeAction(this.props.match.params.id)
            .catch(error => {
                toastr.error(error);
            });

        this.props.action.getDepartmentsAction()
            .catch(error => {
                toastr.error(error);
            });
    }

    handleSave(values) {
      const employee = {
          firstName: values.firstName,
          lastName: values.lastName,
          departmentId: values.departmentId,
          id: values.id
      };

      this.props.action.saveEmployeeAction(employee)
          .then(() => {
              toastr.success('Employee has been saved.');
              this.props.history.push('/employees');
          }).catch(error => {
              toastr.error(error);
          });
    }

    handleCancel(event) {
        event.preventDefault();
        this.props.history.replace('/employees');
    }

    render() {
        const initialValues = this.props.match.params;
        const heading = initialValues && initialValues.id ? 'Edit Employee' : 'Add New Employee Into Department';

        return (
            <div className="container">
                <EmployeeForm
                    heading={heading}
                    departments={this.props.departments}
                    handleSave={this.handleSave}
                    handleCancel={this.handleCancel}
                    initialValues={this.props.initialValues}
                />
            </div>
        );
    }
}

AddOrEditEmployeeContainer.propTypes = {
    action: PropTypes.object.isRequired,
    history: PropTypes.object,
    initialValues: PropTypes.object,
    match: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    const employeeId = ownProps.match.params.id; //from the path '/employee/:id'

    if (employeeId && state.selectedEmployeeReducer.employee && employeeId === state.selectedEmployeeReducer.employee.id) {
        return {
            initialValues: state.selectedEmployeeReducer.employee,
            departments: departmentsFormattedForDropdown(state.departmentsReducer.departments)
        };
    } else {
        return {
            departments: departmentsFormattedForDropdown(state.departmentsReducer.departments)
        };
    }
};

const mapDispatchToProps = dispatch => ({
    action: bindActionCreators({ ...employeeAction, ...departmentAction  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AddOrEditEmployeeContainer);
