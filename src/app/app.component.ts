import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd, NavigationError, NavigationCancel, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'micro-instagram';
  

  constructor() {
    
  }

  
}
