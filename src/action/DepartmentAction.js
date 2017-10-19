import * as ActionType from './ActionType';
import DepartmentApi from '../api/DepartmentApi';
import { ApiCallBeginAction, ApiCallErrorAction } from './ApiAction';

export const getDepartmentsResponse = departments => ({
    type: ActionType.GET_DEPARTMENTS_RESPONSE,
    departments
});

export const getDepartmentResponse = departmentFound => ({
    type: ActionType.GET_DEPARTMENT_RESPONSE,
    department: departmentFound
});

export const addNewDepartmentResponse = () => ({
    type: ActionType.ADD_NEW_DEPARTMENT_RESPONSE
});

export const updateExistingDepartmentResponse = () => ({
    type: ActionType.UPDATE_EXISTING_DEPARTMENT_RESPONSE
});

export const deleteDepartmentResponse = () => ({
    type: ActionType.DELETE_DEPARTMENT_RESPONSE
});

/*
 * Load all department records
 */
export function getDepartmentsAction() {
    return (dispatch) => {

        dispatch(ApiCallBeginAction());

        return DepartmentApi.getAllDepartments()
            .then(departments => {
                dispatch(getDepartmentsResponse(departments));
            }).catch(error => {
                throw error;
            });
    };
}

/*
 * Load department record by id
 */
export function getDepartmentAction(departmentId) {
    return (dispatch) => {

        dispatch(ApiCallBeginAction());

        return DepartmentApi.getDepartment(departmentId)
            .then(department => {
                dispatch(getDepartmentResponse(department));
            }).catch(error => {
                throw error;
            });
    };
}

/*
 * Save/Update department record
 */
export function saveDepartmentAction(department){

  return function (dispatch) {
      dispatch(ApiCallBeginAction());
      return DepartmentApi.saveDepartment(department)
          .then(() => {
              if (department.id) {
                  dispatch(updateExistingDepartmentResponse());
              } else {
                  dispatch(addNewDepartmentResponse());
              }
          }).then(() => {
              dispatch(getDepartmentsAction());
          }).catch(error => {
              dispatch(ApiCallErrorAction());
              throw (error);
          });
  };
}

/*
 * Delete department record by departmentId
 */
export function deleteDepartmentAction(departmentId) {
    return (dispatch) => {

        dispatch(ApiCallBeginAction());

        return DepartmentApi.deleteDepartment(departmentId)
            .then(() => {
                dispatch(deleteDepartmentResponse());
            }).then(() => {
                dispatch(getDepartmentsAction());
            }).catch(error => {
                throw error;
            });
    };
}
