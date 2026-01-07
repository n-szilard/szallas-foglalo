import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Accomodation } from '../../../interfaces/accomodation';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  accomodations: Accomodation[] = [];

  filteredAccomodations: Accomodation[] = [];

  searchQuery = "";

  filterAccomodations() {
    if (this.searchQuery == "") {
      this.filteredAccomodations = this.accomodations;
    } else {
      this.filteredAccomodations = this.accomodations.filter(hotel => hotel.name.includes(this.searchQuery))
    }
  }

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getAllSzallas();
  }

  getAllSzallas() {
    this.api.selectAll('accomodations').then(res => {
      this.accomodations = res.data;
      this.filteredAccomodations = this.accomodations;
    })
  }
}
