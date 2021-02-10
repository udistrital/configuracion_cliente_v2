import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loadRouting = false;
  environment = environment;
  constructor(private router: Router,
  ) { }
  ngOnInit(): void {
    const oas = document.querySelector('ng-uui-oas');
    console.log(oas);
    oas.addEventListener('user', (event: any) => {
      if (event.detail) {
        console.log(event.detail)
        this.loadRouting = true;
      }
    });

    oas.addEventListener('option', (event: any) => {
      if (event.detail) {
        setTimeout(() => { this.router.navigate([event.detail.Url]) }, 300)
      }
    });

  }
}
