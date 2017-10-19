import * as ActionType from '../action/ActionType';
import initialState from './initialState';
import _ from 'lodash';


const selectedDepartmentReducer = (state = initialState.selectedDepartmentReducer, action) => {
    switch(action.type) {

        case ActionType.GET_DEPARTMENT_RESPONSE: {
            return {
                ...state,
                department: _.assign(action.department)
            };
        }


        default: { return state; }
    }
};


export default selectedDepartmentReducer;
