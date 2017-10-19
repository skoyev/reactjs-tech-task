import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const employees = [
    {
        id: "1",
        firstName: "First Name Employee 1",
        lastName: "Last Name Employee 1",
        departmentId: "5"
    },
    {
        id: "2",
        name: "First Name Employee 2",
        lastName: "Last Name Employee 2",
        departmentId: "4"
    },
    {
        id: "3",
        firstName: "First Name Employee 3",
        lastName: "Last Name Employee 3",
        departmentId: "3"
    },
    {
        id: "4",
        firstName: "First Name Employee 4",
        lastName: "Last Name Employee 4",
        departmentId: "2"
    },
    {
        id: "5",
        firstName: "First Name Employee 5",
        lastName: "Last Name Employee 5",
        departmentId: "1"
    }
];

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (employee) => {
    return Math.random().toString(36).slice(2);
};

class EmployeeApi {

  /*
   * Load all employee records
   */
    static getAllEmployees() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(Object.assign([], employees));
            }, delay);
        });
    }

    /*
     * Load employee record by id
     */
    static getEmployee(employeeId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const existingEmployeeIndex = employees.findIndex(employee => employee.id === employeeId);

                const employeeFound = Object.assign({}, employees[existingEmployeeIndex]);

                resolve(employeeFound);

            }, delay);
        });
    }

    /*
     * Delete employee record
     */
    static deleteEmployee(employeeId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const indexOfEmployeeToDelete = employees.findIndex(employee => employee.id === employeeId);
                employees.splice(indexOfEmployeeToDelete, 1);
                resolve();
            }, delay);
        });
    }

    /*
     * Save employee record
     */
    static saveEmployee(employee) {
        employee = Object.assign({}, employee);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate server-side validation
                const minEmployeeTitleLength = 3;
                if (employee.firstName === undefined ||
                      employee.firstName.length < minEmployeeTitleLength) {
                    reject(`First Name must be at least ${minEmployeeTitleLength} characters.`);
                }

                if (employee.lastName === undefined ||
                        employee.lastName.length < minEmployeeTitleLength) {
                    reject(`Last Name must be at least ${minEmployeeTitleLength} characters.`);
                }

                if (employee.departmentId === undefined) {
                    reject(`Please select department.`);
                }

                if (employee.id) {
                    const existingEmployeeIndex = employees.findIndex(a => a.id === employee.id);
                    employees.splice(existingEmployeeIndex, 1, employee);
                } else {
                    employee.id = generateId(employee);
                    employees.push(employee);
                }

                resolve(employee);
            }, delay);
        });
    }
}

export default EmployeeApi;
