import { Component, OnInit, TemplateRef } from '@angular/core';
import { Project } from '../models/project';
import * as moment from 'moment';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { User } from '../models/user';
import { EventService } from '../services/event.service';
import { ProjectService } from '../services/project.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projectToAdd: Project;
  buttonName: string;
  startEndDateEnable: boolean;
  minStartDate: Date;
  minEndDate: Date;
  modalRef: BsModalRef;
  selectedIndexUser: number;
  selectedUser: string;
  users: Array<User>;
  searchText: string;

  constructor(private eventService: EventService, private projectService: ProjectService,
    private userService: UserService, private modalService: BsModalService) {
    this.users = new Array<User>();
  }

  ngOnInit() {
    this.projectToAdd = new Project();
    this.buttonName = 'Add';
    this.projectToAdd.priority = '0';
    this.minStartDate = new Date();
    this.minEndDate = new Date();
    this.minEndDate.setDate(this.minStartDate.getDate() + 1);
  }
  setStartEndDateChange($event) {
    if (this.startEndDateEnable) {
      this.projectToAdd.start_Date = moment(new Date()).format('MM-DD-YYYY').toString();
      this.projectToAdd.end_Date = moment(new Date()).add(1, 'days').format('MM-DD-YYYY').toString();
    } else {
      this.projectToAdd.start_Date = null;
      this.projectToAdd.end_Date = null;
    }
  }
  setMinEndDate($event) {
    this.minEndDate = moment(this.projectToAdd.start_Date).add(1, 'days').toDate();
    if (this.projectToAdd.end_Date <= this.projectToAdd.start_Date) {
      this.projectToAdd.end_Date = moment(this.minEndDate).format('MM-DD-YYYY').toString();
    }
  }


  openModal(template: TemplateRef<any>) {
    this.eventService.showLoading(true);
    this.userService.getUser().subscribe((user) => {
      this.users = user;
      this.modalRef = this.modalService.show(template);
      this.eventService.showLoading(false);
    },
      (error) => {
        this.eventService.showError(error);
        this.eventService.showLoading(false);
      });

  }
  setIndex(index: number) {
    this.selectedIndexUser = index;
  }
  selectUser() {
    this.projectToAdd.user_ID = +this.users[this.selectedIndexUser].user_ID;
    this.selectedUser = this.users[this.selectedIndexUser].first_Name;
    this.selectedIndexUser = null;
    this.modalRef.hide();
  }

  addProject() {
    if (!this.projectToAdd.project1 || this.projectToAdd.project1 === '') {
      this.eventService.showWarning('Please add project name ');
      return;
    }
    if (!this.projectToAdd.priority) {
      this.eventService.showWarning('Please set priority ');
      return;
    }
    if (this.startEndDateEnable && (!this.projectToAdd.start_Date || this.projectToAdd.start_Date.toString() === '')) {
      this.eventService.showWarning('Please select start date ');
      return;
    }
    if (this.startEndDateEnable && (!this.projectToAdd.end_Date || this.projectToAdd.end_Date.toString() === '')) {
      this.eventService.showWarning('Please select end date ');
      return;
    }
    if (!this.projectToAdd.user_ID || this.projectToAdd.user_ID.toString() === '') {
      this.eventService.showWarning('Please select userId ');
      return;
    }
    this.eventService.showLoading(true);
    this.projectService.addProject(this.projectToAdd).subscribe((data) => {
      this.eventService.showSuccess('Saved successfully');
      this.resetProject();
      this.eventService.showLoading(false);
    },
      (error) => {
        this.eventService.showError(error);
        this.eventService.showLoading(false);
      });
  }
  resetProject() {
    this.projectToAdd = new Project();
    this.selectedUser = null;
    this.selectedIndexUser = null;
  }
}
