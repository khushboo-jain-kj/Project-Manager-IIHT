import { Component, OnInit, TemplateRef } from '@angular/core';
import { Task } from '../models/task';
import { EventService } from '../services/event.service';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ProjectService } from '../services/project.service';
import { UserService } from '../services/user.service';
import { Project } from '../models/project';
import { User } from '../models/user';
import { TaskService } from '../services/task.service';
import { ParentTask } from '../models/parentTask';

import * as moment from 'moment';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  modalRef: BsModalRef;
  tasks: Array<Task>;
  taskToAdd: Task;
  hasParentTask: boolean;
  projects: Array<Project>;
  users: Array<User>;
  selectedIndex: number;
  selectedProjName: string;
  selectedIndexParent: number;
  selectedParentTask: string;
  selectedIndexUser: number;
  selectedUser: string;
  parentTasks: Array<ParentTask>;
  searchText: string;
  minStartDate: Date;
  minEndDate: Date;

  constructor(private eventService: EventService, private projectService: ProjectService,
    private userService: UserService, private taskService: TaskService, private modalService: BsModalService) {
    this.projects = new Array<Project>();
    this.users = new Array<User>();
    this.parentTasks = new Array<ParentTask>();
  }

  ngOnInit() {
    this.taskToAdd = new Task();
    this.taskToAdd.priority = '0';
    this.minStartDate = new Date();
    this.minEndDate = new Date();
    this.minEndDate.setDate(this.minStartDate.getDate() + 1);
    this.taskToAdd.start_Date = moment(new Date()).toDate();
    this.taskToAdd.end_Date = moment(new Date()).add(1, 'days').toDate();
  }

  setMinEndDate($event) {
    this.minEndDate = moment(this.taskToAdd.start_Date).add(1, 'days').toDate();
    if (this.taskToAdd.end_Date <= this.taskToAdd.start_Date) {
      this.taskToAdd.end_Date = moment(this.minEndDate).toDate();
    }
  }

  addTask() {
    if (!this.taskToAdd.project_ID) {
      this.eventService.showWarning('Please select project ');
      return;
    }
    if (!this.taskToAdd.task || this.taskToAdd.task === '') {
      this.eventService.showWarning('Please add task name ');
      return;
    }
    if (!this.hasParentTask && (!this.taskToAdd.priority || this.taskToAdd.priority === '0')) {
      this.eventService.showWarning('Please set priority ');
      return;
    }
    if (!this.hasParentTask && (!this.taskToAdd.start_Date || this.taskToAdd.start_Date.toString() === '')) {
      this.eventService.showWarning('Please select start date ');
      return;
    }
    if (!this.hasParentTask && (!this.taskToAdd.end_Date || this.taskToAdd.end_Date.toString() === '')) {
      this.eventService.showWarning('Please select end date ');
      return;
    }
    if (!this.hasParentTask && (!this.taskToAdd.user_ID || this.taskToAdd.user_ID.toString() === '')) {
      this.eventService.showWarning('Please select userId ');
      return;
    }
    this.eventService.showLoading(true);
    this.taskService.addTask(this.taskToAdd).subscribe((data) => {
      this.eventService.showSuccess('Saved successfully');
      this.resetTask();
      this.eventService.showLoading(false);
    },
      (error) => {
        this.eventService.showError(error);
        this.eventService.showLoading(false);
      });
  }

  openModal(template: TemplateRef<any>, type: number) {
    this.searchText = undefined;
    if (type === 1) {
      this.eventService.showLoading(true);
      this.projectService.getProject().subscribe((project) => {
        this.projects = project;
        this.modalRef = this.modalService.show(template);
        this.eventService.showLoading(false);
      },
        (error) => {
          this.eventService.showError(error);
          this.eventService.showLoading(false);
        });
    }
    if (type === 2) {
      if (!this.hasParentTask) {
        this.eventService.showLoading(true);
        this.taskService.getParentTask().subscribe((parentTask) => {
          this.parentTasks = parentTask;
          this.modalRef = this.modalService.show(template);
          this.eventService.showLoading(false);
        },
          (error) => {
            this.eventService.showError(error);
            this.eventService.showLoading(false);
          });
      } else {
        this.eventService.showWarning('parent task only needs task name and project');
      }
    }
    if (type === 3) {
      if (!this.hasParentTask) {
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
      } else {
        this.eventService.showWarning('parent task only needs task name and project');
      }
    }
  }

  resetTask() {
    this.taskToAdd = new Task();
    this.hasParentTask = undefined;
  }

  setIndex(index: number, type: number) {
    if (type === 1) {
      this.selectedIndex = index;
    }
    if (type === 2) {
      this.selectedIndexParent = index;
    }
    if (type === 3) {
      this.selectedIndexUser = index;
    }
  }

  selectProj() {
    this.taskToAdd.project_ID = +this.projects[this.selectedIndex].project_ID;
    this.selectedProjName = this.projects[this.selectedIndex].project1;
    this.selectedIndex = null;
    this.modalRef.hide();
  }

  selectParentTask() {
    this.taskToAdd.parent_ID = +this.parentTasks[this.selectedIndexParent].parent_ID;
    this.selectedParentTask = this.parentTasks[this.selectedIndexParent].parent_Task1;
    this.selectedIndexParent = null;
    this.modalRef.hide();
  }
  selectUser() {
    this.taskToAdd.user_ID = +this.users[this.selectedIndexUser].user_ID;
    this.selectedUser = this.users[this.selectedIndexUser].first_Name;
    this.selectedIndexUser = null;
    this.modalRef.hide();
  }
  hasParTaskChange($event) {
    if (this.hasParentTask) {
      this.selectedIndexParent = null;
      this.selectedIndexParent = null;
      this.selectedParentTask = null;
      this.selectedUser = null;
      this.taskToAdd.priority = '0';
      this.taskToAdd.parent_ID = null;
      this.taskToAdd.start_Date = null;
      this.taskToAdd.end_Date = null;
      this.taskToAdd.user_ID = null;
    } else {
      this.taskToAdd.start_Date = moment(new Date()).toDate();
      this.taskToAdd.end_Date = moment(new Date()).add(1, 'days').toDate();

    }
  }
}