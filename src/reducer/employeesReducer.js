import * as ActionType from '../action/ActionType';
import initialState from './initialState';
import _ from 'lodash';

const employeesReducer = (state = initialState.employeesReducer, action) => {
    switch(action.type) {
        case ActionType.GET_EMPLOYEES_RESPONSE: {
            return {
                ...state,
                employees: _.assign(action.employees)
            };
        }

        default: { return state; }
    }
};

export default employeesReducer;
