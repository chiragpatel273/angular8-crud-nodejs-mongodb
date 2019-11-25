var Employees = require('../doa/employee.doa');

exports.createEmployee = function (req, res, next) {
    var employee = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        dateOfBirth: req.body.dateOfBirth,
        salary: req.body.salary,
        department: req.body.department,
        country: req.body.country,
    };
    console.log(employee);

    Employees.create(employee, function(err, employee) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Employee created successfully"
        })
    })
}

exports.getEmployees = function(req, res, next) {
    Employees.get({}, function(err, employee) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json(employee)
    })
}

exports.getEmployee = function(req, res, next) {
    console.log(req.params.name);
    Employees.get({firstName: req.params.name}, function(err, employee) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json(employee)
    })
}

exports.updateEmployee = function(req, res, next) {
    var employee = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        dateOfBirth: req.body.dateOfBirth,
        salary: req.body.salary,
        department: req.body.department,
        country: req.body.country,
    };
    Employees.update({_id: req.params.id}, employee, function(err, employee) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Employee updated successfully"
        })
    })
}

exports.removeEmployee = function(req, res, next) {
    Employees.delete({_id: req.params.id}, function(err, employee) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Employee deleted successfully"
        })
    })
}