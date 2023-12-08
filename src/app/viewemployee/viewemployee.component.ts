import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { EmployeeService } from '../services/employeeService/employee.service';

@Component({
  selector: 'app-viewemployee',
  templateUrl: './viewemployee.component.html',
  styleUrls: ['./viewemployee.component.css']
})
export class ViewemployeeComponent implements OnInit {
  filteredUsers: User[] = []; 
  searchKeyword = '';
  constructor(private employeeService :EmployeeService) { }
  users: User[] = [];
  
  ngOnInit(): void {
this.getAllEmployees();
    this.filteredUsers=this.users;
  }

  getAllEmployees (){
    this.employeeService.getEmployees().subscribe(
      (result) => {
        this.users = result;
        console.log(this.users);
        this.filteredUsers=result;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );

  }
  filterUsers(searchKeyword: string) {
    // Check if searchKeyword is defined
    if (searchKeyword !== null && searchKeyword !== undefined) {
      // Filter the users based on the search keyword
      this.filteredUsers = this.users.filter((user) => {
        // Check if firstname and lastname are not null before applying toLowerCase
        const isMatch =
          (user.firstname !== null && user.firstname.toLowerCase().includes(searchKeyword.toLowerCase())) ||
          (user.lastname !== null && user.lastname.toLowerCase().includes(searchKeyword.toLowerCase())) ||
          user.email.toLowerCase().includes(searchKeyword.toLowerCase());
        
        return isMatch;
      });
    } else {
      // If searchKeyword is not defined, reset the filteredUsers to all users
      this.filteredUsers = this.users;
    }
  }
  
  
  

}
