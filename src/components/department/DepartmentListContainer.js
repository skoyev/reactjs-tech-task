import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as departmentAction from '../../action/DepartmentAction';
import DepartmentList from './DepartmentList';

/**
 * Department List Container Component
 */
export class DepartmentListContainer extends React.Component {

    constructor() {
        super();
        this.state = {selectedDepartmentId: undefined};
        this.handleAddDepartment = this.handleAddDepartment.bind(this);
        this.handleEditDepartment = this.handleEditDepartment.bind(this);
        this.handleDeleteDepartment = this.handleDeleteDepartment.bind(this);
        this.handleRowSelect = this.handleRowSelect.bind(this);
    }

    componentDidMount() {
      this.props.action.getDepartmentsAction()
          .catch(error => {
              toastr.error(error);
          });
    }

    handleAddDepartment() {
      this.props.history.push('/department');
    }

    handleEditDepartment() {
      const selectedDepartmentId = this.state.selectedDepartmentId;

      if (selectedDepartmentId) {
          this.setState({selectedDepartmentId: undefined});
          this.props.history.push(`/department/${selectedDepartmentId}`);
      }
    }

    handleDeleteDepartment() {
      const selectedDepartmentId = this.state.selectedDepartmentId;

      if (selectedDepartmentId) {
          this.setState({selectedDepartmentId: undefined});
          this.props.action.deleteDepartmentAction(selectedDepartmentId)
              .catch(error => {
                  toastr.error(error);
              });
      }
    }

    handleRowSelect(row, isSelected){
      if (isSelected) {
          this.setState({selectedDepartmentId: row.id});
      }
    }

    render() {
      const { departments } = this.props;

      if (!departments) {
          return (
              <div>Loading Departments...</div>
          );
      }

      return (
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col">
                        <h1>Departments</h1>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col">
                        <div className="btn-group" role="group">

                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={this.handleAddDepartment}>
                                <i className="fa fa-plus" aria-hidden="true"/> New
                            </button>

                            <button
                                type="button"
                                className="btn btn-warning ml-2"
                                onClick={this.handleEditDepartment}>
                                <i className="fa fa-pencil" aria-hidden="true"/> Edit
                            </button>

                            <button
                                type="button"
                                className="btn btn-danger ml-2"
                                onClick={this.handleDeleteDepartment}>
                                <i className="fa fa-trash-o" aria-hidden="true" onClick={this.handleDeleteDepartment}/> Delete
                            </button>

                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <DepartmentList departments={departments} handleRowSelect={this.handleRowSelect}/>
                    </div>
                </div>

            </div>
        );
    }
}
const mapStateToProps = state => ({
    departments: state.departmentsReducer.departments
});

const mapDispatchToProps = dispatch => ({
    action: bindActionCreators(departmentAction, dispatch)

});

DepartmentListContainer.propTypes = {
    departments: PropTypes.array,
    action: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentListContainer);
