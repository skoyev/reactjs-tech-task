import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as departmentAction from '../../action/DepartmentAction';
import DepartmentForm from './DepartmentForm';

export class AddOrEditDepartmentContainer extends React.Component {

    constructor() {
        super();
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentDidMount() {
        this.props.action.getDepartmentAction(this.props.match.params.id)
            .catch(error => {
                toastr.error(error);
            });
    }

    handleSave(values) {
      const department = {
          title: values.title,
          id: values.id
      };

      this.props.action.saveDepartmentAction(department)
          .then(() => {
              toastr.success('Department has been saved.');
              this.props.history.push('/departments');
          }).catch(error => {
              toastr.error(error);
          });
    }

    handleCancel(event) {
        event.preventDefault();
        this.props.history.replace('/departments');
    }

    render() {
        const initialValues = this.props.match.params;
        const heading = initialValues && initialValues.id ? 'Edit Department' : 'Add New Department';

        return (
            <div className="container">
                <DepartmentForm
                    heading={heading}
                    handleSave={this.handleSave}
                    handleCancel={this.handleCancel}
                    initialValues={this.props.initialValues}
                />
            </div>
        );
    }
}

AddOrEditDepartmentContainer.propTypes = {
    action: PropTypes.object.isRequired,
    history: PropTypes.object,
    initialValues: PropTypes.object,
    match: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    const departmentId = ownProps.match.params.id; //from the path '/department/:id'

    if (departmentId && state.selectedDepartmentReducer.department && departmentId === state.selectedDepartmentReducer.department.id) {
        return {
            initialValues: state.selectedDepartmentReducer.department            
        };
    } else {
        return {
            departmentId: 0
        };
    }
};

const mapDispatchToProps = dispatch => ({
    action: bindActionCreators({ ...departmentAction }, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(AddOrEditDepartmentContainer);
