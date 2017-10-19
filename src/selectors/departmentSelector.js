export const departmentsFormattedForDropdown = departments => {
    if (!departments) {
        return;
    }

    return departments.map(department => {
        return {
            value: department.id,
            text: `${department.title}`
        };
    });
};
