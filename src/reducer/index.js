import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import departmentsReducer from './departmentsReducer';
import employeesReducer  from './employeesReducer';
import selectedDepartmentReducer from './selectedDepartmentReducer';
import selectedEmployeeReducer from './selectedEmployeeReducer';
import apiReducer from './apiReducer';

export default combineReducers({
    departmentsReducer,
    employeesReducer,
    selectedDepartmentReducer,
    selectedEmployeeReducer,    
    apiReducer,
    form: formReducer
});
