import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { Accomodation } from '../../../interfaces/accomodation';

@Component({
  selector: 'app-accomodation-info',
  standalone: true,
  imports: [
    CommonModule,RouterModule
  ],
  templateUrl: './accomodation-info.component.html',
  styleUrl: './accomodation-info.component.scss'
})
export class AccomodationInfoComponent implements OnInit {
  accomodations: Accomodation[] = [];
    selectedAccomodation: Accomodation = {
      id: 0,
      name: '',
      description: '',
      address: '',
      capacity: 0,
      basePrice: 0,
      active: false
    }
  id!: number;
  constructor(
    private api: ApiService,
    private route: ActivatedRoute){}
  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'))
    this.selectAcc(this.id);
  }

  selectAcc(id: number) {
    this.api.selectOne('accomodations', id).then(res => {
      this.selectedAccomodation = res.data[0];
    })
  }
}
