import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.scss']
})
export class ServerErrorComponent implements OnInit {
  error: any;

  constructor(private router: Router) {
    // NavigationExtras only available inside constructor
    // refresh page will lost state info
    const nav = this.router.getCurrentNavigation();
    this.error = nav && nav.extras && nav.extras.state && nav.extras.state.error;
  }

  ngOnInit(): void {
  }

}
