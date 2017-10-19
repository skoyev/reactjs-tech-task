import * as ActionType from '../action/ActionType';
import initialState from './initialState';
import _ from 'lodash';


const selectedEmployeeReducer = (state = initialState.selectedEmployeeReducer, action) => {
    switch(action.type) {

        case ActionType.GET_EMPLOYEE_RESPONSE: {
            return {
                ...state,
                employee: _.assign(action.employee)
            };
        }


        default: { return state; }
    }
};


export default selectedEmployeeReducer;
