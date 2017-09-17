import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../employees.service';
import { Employee } from '../../Employee';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employee: Employee = {
    _id: '',
    name: '',
    email: '',
    dob: new Date(),
    gender: '',
    department: '',
    age: 0
  }

  employees: any = [];
  employeeform: any;

  constructor(private employeesService: EmployeesService, private formBuilder: FormBuilder) {
    this.employeeform = this.formBuilder.group({
      'name': ['', Validators.required],
      'email': ['', [Validators.required]],
      'dob': ['', [Validators.required]],
      'department': ['', [Validators.required]],
      'gender': ['', [Validators.required]]
    });

  }

  ngOnInit() {
    this.employeesService.getAllEmployees().subscribe(employees => {
      this.employees = employees;
    });
  }

  calculateAge(dob) {
    var birthday = new Date(dob);
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  validateEmployee() {
    if (!this.employee.name || this.employee.name == '')
      alert("Employee Name is reqired.");
    else if (!this.employee.email || this.employee.email == '')
      alert("Employee Email is reqired.");
    else if (!this.employee.dob)
      alert("Employee DOB is reqired.");
    else if (!this.employee.department || this.employee.department == '')
      alert("Department is reqired.");
    else if (!this.employee.gender || this.employee.gender == '')
      alert("Gender is reqired.");
    else if (this.calculateAge(this.employee.dob)<=18)
      alert("Employee age is < 18 yrs, Please choose your dob properly");
    else this.addEmployee();
  }

  addEmployee() {
    var newEmployee = {
      name: this.employee.name,
      email: this.employee.email,
      dob: this.employee.dob,
      gender: this.employee.gender,
      department: this.employee.department,
      age: this.calculateAge(this.employee.dob)
    }

    this.employeesService.addEmployee(newEmployee)
      .subscribe(employee => {
        this.employees.push(employee);
      });
  }

  editEmployee(employee) {
    this.employee._id = employee._id;
    this.employee.name = employee.name;
    this.employee.email = employee.email;
    this.employee.dob = employee.dob;
    this.employee.department = employee.department;
    this.employee.gender = employee.gender;
    this.employee.age = employee.age;
  }

  updateEmployee(employee) {
    console.log(employee._id);
    var _employee = {
      _id: employee._id,
      name: this.employee.name,
      email: this.employee.email,
      dob: this.employee.dob,
      gender: this.employee.gender,
      department: this.employee.department,
      age: this.calculateAge(this.employee.dob)
    }
    this.employeesService.updateEmployee(_employee).subscribe(data => {
      this.ngOnInit();
    })

  }

  removeEmployee(id) {
    console.log(id);
    this.employeesService.deleteEmployee(id).subscribe(data => {
      this.ngOnInit();
    });
  }
}