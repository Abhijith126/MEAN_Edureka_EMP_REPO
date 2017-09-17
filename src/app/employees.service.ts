import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class EmployeesService {

  constructor(private http: Http) { }

  getAllEmployees() {
    return this.http.get('/api/employees')
      .map(res => res.json());
  }

  addEmployee(employee) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/employee', JSON.stringify(employee), { headers: headers })
      .map(res => res.json());

  }

  deleteEmployee(id) {
    console.log(id);
    return this.http.delete('/api/employee/' + id)
      .map(res => res.json());
  }

  updateEmployee(employee) {
    console.log(employee._id);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('/api/employee/' + employee._id, JSON.stringify(employee),
      { headers: headers })
      .map(res => res.json());
  }
}