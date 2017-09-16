var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://test:test@ds135574.mlab.com:35574/employee-repo-abhi', ['employees']);

// Get All employees
router.get('/employees', function(req, res, next){
    db.employees.find(function(err, employees){
        if(err){
            res.send(err);
        }
        res.json(employees);
    });
});

// Get Single employee
router.get('/employee/:id', function(req, res, next){
    db.employees.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, employee){
        if(err){
            res.send(err);
        }
        res.json(employee);
    });
});

//Save employee
router.post('/employee', function(req, res, next){
    var employee = req.body;
    if(!employee.name || !(employee.email + '')){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.employees.save(employee, function(err, employee){
            if(err){
                res.send(err);
            }
            res.json(employee);
        });
    }
});

// Delete employee
router.delete('/employee/:id', function(req, res, next){
    db.employees.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, employee){
        if(err){
            res.send(err);
        }
        res.json(employee);
    });
});

// Update employee
router.put('/employee/:id', function(req, res, next){
    var employee = req.body;
    var updemployee = {};
    
    if(employee.isDone){
        updemployee.isDone = employee.isDone;
    }
    
    if(employee.title){
        updemployee.title = employee.title;
    }
    
    if(!updemployee){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.employees.update({_id: mongojs.ObjectId(req.params.id)},updemployee, {}, function(err, employee){
        if(err){
            res.send(err);
        }
        res.json(employee);
    });
    }
});

module.exports = router;