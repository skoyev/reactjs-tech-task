import * as ActionType from './ActionType';
import EmployeeApi from '../api/EmployeeApi';
import { ApiCallBeginAction, ApiCallErrorAction } from './ApiAction';

export const getEmployeesResponse = employees => ({
    type: ActionType.GET_EMPLOYEES_RESPONSE,
    employees
});

export const getEmployeeResponse = employeeFound => ({
    type: ActionType.GET_EMPLOYEE_RESPONSE,
    employee: employeeFound
});

export const addNewEmployeeResponse = () => ({
    type: ActionType.ADD_NEW_EMPLOYEE_RESPONSE
});

export const updateExistingEmployeeResponse = () => ({
    type: ActionType.UPDATE_EXISTING_EMPLOYEE_RESPONSE
});

export const deleteEmployeeResponse = () => ({
    type: ActionType.DELETE_EMPLOYEE_RESPONSE
});

/*
 * Load all employee records
 */
export function getEmployeesAction() {
    return (dispatch) => {

        dispatch(ApiCallBeginAction());

        return EmployeeApi.getAllEmployees()
            .then(employees => {
                dispatch(getEmployeesResponse(employees));
            }).catch(error => {
                throw error;
            });
    };
}

/*
 * Load employee record by id
 */
export function getEmployeeAction(employeeId) {
    return (dispatch) => {

        dispatch(ApiCallBeginAction());

        return EmployeeApi.getEmployee(employeeId)
            .then(employee => {
                dispatch(getEmployeeResponse(employee));
            }).catch(error => {
                throw error;
            });
    };
}

/*
 * Save/Update employee record
 */
export function saveEmployeeAction(employee){

  return function (dispatch) {
      dispatch(ApiCallBeginAction());
      return EmployeeApi.saveEmployee(employee)
          .then(() => {
              if (employee.id) {
                  dispatch(updateExistingEmployeeResponse());
              } else {
                  dispatch(addNewEmployeeResponse());
              }
          }).then(() => {
              dispatch(getEmployeesAction());
          }).catch(error => {
              dispatch(ApiCallErrorAction());
              throw (error);
          });
  };
}

/*
 * Delete employee record by employeeId
 */
export function deleteEmployeeAction(employeeId) {
    return (dispatch) => {

        dispatch(ApiCallBeginAction());

        return EmployeeApi.deleteEmployee(employeeId)
            .then(() => {
                dispatch(deleteEmployeeResponse());
            }).then(() => {
                dispatch(getEmployeesAction());
            }).catch(error => {
                throw error;
            });
    };
}
