import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as employeeAction from '../../action/EmployeeAction';
import EmployeeList from './EmployeeList';

/**
 * Employee List Container Component
 */
export class EmployeeListContainer extends React.Component {

    constructor() {
        super();
        this.state = {selectedEmployeeId: undefined};
        this.handleAddEmployee = this.handleAddEmployee.bind(this);
        this.handleEditEmployee = this.handleEditEmployee.bind(this);
        this.handleDeleteEmployee = this.handleDeleteEmployee.bind(this);
        this.handleRowSelect = this.handleRowSelect.bind(this);
    }

    componentDidMount() {
      this.props.action.getEmployeesAction()
          .catch(error => {
              toastr.error(error);
          });
    }

    handleAddEmployee() {
      this.props.history.push('/employee');
    }

    handleEditEmployee() {
      const selectedEmployeeId = this.state.selectedEmployeeId;

      if (selectedEmployeeId) {
          this.setState({selectedEmployeeId: undefined});
          this.props.history.push(`/employee/${selectedEmployeeId}`);
      }
    }

    handleDeleteEmployee() {
      const selectedEmployeeId = this.state.selectedEmployeeId;

      if (selectedEmployeeId) {
          this.setState({selectedEmployeeId: undefined});
          this.props.action.deleteEmployeeAction(selectedEmployeeId)
              .catch(error => {
                  toastr.error(error);
              });
      }
    }

    handleRowSelect(row, isSelected){
      if (isSelected) {
          this.setState({selectedEmployeeId: row.id});
      }
    }

    render() {
      const { employees } = this.props;

      if (!employees) {
          return (
              <div>Loading Employees...</div>
          );
      }

      return (
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col">
                        <h1>Employees</h1>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col">
                        <div className="btn-group" role="group">

                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={this.handleAddEmployee}>
                                <i className="fa fa-plus" aria-hidden="true"/> New
                            </button>

                            <button
                                type="button"
                                className="btn btn-warning ml-2"
                                onClick={this.handleEditEmployee}>
                                <i className="fa fa-pencil" aria-hidden="true"/> Edit
                            </button>

                            <button
                                type="button"
                                className="btn btn-danger ml-2"
                                onClick={this.handleDeleteEmployee}>
                                <i className="fa fa-trash-o" aria-hidden="true" onClick={this.handleDeleteEmployee}/> Delete
                            </button>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <EmployeeList employees={employees} handleRowSelect={this.handleRowSelect}/>
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    employees: state.employeesReducer.employees
});

const mapDispatchToProps = dispatch => ({
    action: bindActionCreators(employeeAction, dispatch)
});

EmployeeListContainer.propTypes = {
    employees: PropTypes.array,
    action: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeListContainer);
