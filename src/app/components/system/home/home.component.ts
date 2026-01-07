import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Accomodation } from '../../../interfaces/accomodation';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  accomodations: Accomodation[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getAllSzallas();
  }

  getAllSzallas() {
    this.api.selectAll('accomodations').then(res => {
      this.accomodations = res.data;
    })
  }
}
