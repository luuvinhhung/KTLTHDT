import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
declare var jQuery: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
    jQuery('.carousel').carousel({
      interval: 2000
    });
  }

  // viewProducts() {
  //   this.router.navigate(['/products']);
  // }

}
