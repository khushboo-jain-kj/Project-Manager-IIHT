import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../models/task';

import { EventService } from '../services/event.service';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  modalRef: BsModalRef;
  projects: Array<Project>;
  searchText: string;
  selectedIndex: number;
  selectedProjName: string;
  tasks: Array<Task> = [];
  taskSearch: boolean;

  constructor(private eventService: EventService, private projectService: ProjectService,
    private taskService: TaskService, private modalService: BsModalService, private router: Router) {
    this.projects = new Array<Project>();
  }

  ngOnInit() {
    this.eventService.showLoading(true);
    this.projectService.getProject().subscribe((project) => {
      this.projects = project;
      this.eventService.showLoading(false);
    },
      (error) => {
        this.eventService.showError(error);
        this.eventService.showLoading(false);
      });
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  setIndex(index: number) {
    this.selectedIndex = index;
  }

  selectProj() {
    this.selectedProjName = this.projects[this.selectedIndex].projectName;
    this.taskService.getAllTasksByProjectId(+this.projects[this.selectedIndex].projectId).subscribe(
      (tasks) => {
        this.tasks = tasks;
        this.taskSearch = true;
        this.eventService.showLoading(false);
      },
      (error) => {
        this.eventService.showError(error);
        this.eventService.showLoading(false);
      });
    this.selectedIndex = null;
    this.modalRef.hide();

  }

  editTask(task) {
    this.router.navigate(['/addTask', { task: JSON.stringify(task) }]);
  }

  deleteTask(task) {
    this.eventService.showLoading(true);
    this.taskService.deleteTask(task).subscribe((data) => {
      this.eventService.showSuccess('Task completed successfully')
      this.selectProj();
      this.eventService.showLoading(false);
    },
      (error) => {
        this.eventService.showError(error);
        this.eventService.showLoading(false);
      });
  }
}