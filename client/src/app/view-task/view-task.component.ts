import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { EventService } from '../services/event.service';


@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  constructor(private eventService: EventService) {

  }

  ngOnInit() {

  }
}