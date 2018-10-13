import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: Array<User>;
  userToAdd: User;
  buttonName: string;

  constructor(private userService: UserService, private eventService: EventService) {
    this.users = new Array<User>();

  }

  ngOnInit() {
    this.userToAdd = new User();
    this.buttonName = 'Add';
    this.eventService.showLoading(true);
    this.userService.getUser().subscribe((users) => {
      this.users = users;
      this.eventService.showLoading(false);
    },
      (error) => {
        this.eventService.showError(error);
        this.eventService.showLoading(false);
      });
  }

  addUser(){
    if (!this.userToAdd.first_Name || this.userToAdd.first_Name === '') {
      this.eventService.showWarning('Please add first Name ');
      return;
    }
    if (!this.userToAdd.last_Name || this.userToAdd.last_Name === '') {
      this.eventService.showWarning('Please add last Name ');
      return;
    }
    if (!this.userToAdd.employee_ID || this.userToAdd.employee_ID === '') {
      this.eventService.showWarning('Please enter employee id');
      return;
    }
    if (this.buttonName==='Add') {
      this.eventService.showLoading(true);
      this.userService.addUser(this.userToAdd).subscribe((data) => {
        this.eventService.showSuccess('Saved successfully')
        this.ngOnInit();
        this.eventService.showLoading(false);
      },
        (error) => {
          this.eventService.showError(error);
          this.eventService.showLoading(false);
        });
    }
    if (this.buttonName==='Update') {
      this.eventService.showLoading(true);
      this.userService.updateUser(this.userToAdd).subscribe((data) => {
        this.eventService.showSuccess('Update successfully')
        this.ngOnInit();
        this.eventService.showLoading(false);
      },
        (error) => {
          this.eventService.showError(error);
          this.eventService.showLoading(false);
        });
    }
  }

  resetUser() {
    this.userToAdd = new User();
    this.buttonName = 'Add';
  }

  editUser(user) {
    this.buttonName = 'Update';
    this.userToAdd = user;
  }

  deleteUser(user) {
    this.eventService.showLoading(true);
    this.userService.deleteUser(this.userToAdd).subscribe((data) => {
      this.eventService.showSuccess('User Deleted successfully')
      this.ngOnInit();
      this.eventService.showLoading(false);
    },
      (error) => {
        this.eventService.showError(error);
        this.eventService.showLoading(false);
      });
  }

  sortUser(type: number) {
    if (type === 1) {
      this.users.sort((a, b) => (a.first_Name > b.first_Name) ? 1 : ((b.first_Name > a.first_Name) ? -1 : 0));
    }
    if (type === 2) {
      this.users.sort((a, b) => (a.last_Name > b.last_Name) ? 1 : ((b.last_Name > a.last_Name) ? -1 : 0));
    }
    if (type === 3) {
      this.users.sort((a, b) => (a.employee_ID > b.employee_ID) ? 1 : ((b.employee_ID > a.employee_ID) ? -1 : 0));
    }
    this.users = [...this.users];
  }
}
