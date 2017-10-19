import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const departments = [
    {
        id: "1",
        title: "Software Department"
    },
    {
        id: "2",
        title: "Agriculture Department"
    },
    {
        id: "3",
        title: "Financial Department"
    },
    {
        id: "4",
        title: "Accounting Department"
    },
    {
        id: "5",
        title: "Human Resource Department"
    }
];

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (department) => {
    return replaceAll(department.title, ' ', '-');
};

class DepartmentApi {
    /*
     * Load all department records
     */
    static getAllDepartments() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(Object.assign([], departments));
            }, delay);
        });
    }

    /*
     * Load department record by id
     */
    static getDepartment(departmentId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const existingDepartmentIndex = departments.findIndex(department => department.id === departmentId);

                const departmentFound = Object.assign({}, departments[existingDepartmentIndex]);

                resolve(departmentFound);

            }, delay);
        });
    }

    /*
     * Delete department record by id
     */
    static deleteDepartment(departmentId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const indexOfDepartmentToDelete = departments.findIndex(department => department.id === departmentId);
                departments.splice(indexOfDepartmentToDelete, 1);
                resolve();
            }, delay);
        });
    }

    /*
     * Save department record
     */
    static saveDepartment(department) {
        department = Object.assign({}, department);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate server-side validation
                const minDepartmentTitleLength = 1;
                if (department.title.length < minDepartmentTitleLength) {
                    reject(`Title must be at least ${minDepartmentTitleLength} characters.`);
                }

                if (department.id) {
                    const existingDepartmentIndex = departments.findIndex(a => a.id === department.id);
                    departments.splice(existingDepartmentIndex, 1, department);
                } else {
                    department.id = generateId(department);
                    departments.push(department);
                }

                resolve(department);
            }, delay);
        });
    }
}

export default DepartmentApi;
