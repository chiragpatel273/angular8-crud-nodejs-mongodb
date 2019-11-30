var Employees = require('../controllers/employee.controller');

module.exports = function(router) {
    router.post('/create', Employees.createEmployee);
    router.get('/get', Employees.getEmployees);
    router.get('/get/:name', Employees.getEmployee);
    router.put('/update/:id', Employees.updateEmployee);
    router.post('/remove/:id', Employees.removeEmployee);
}