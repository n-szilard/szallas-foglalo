import { Component, OnInit } from '@angular/core';
import { Accomodation } from '../../../interfaces/accomodation';
import { ApiService } from '../../../services/api.service';
import { NgForOf, NgIf } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { MessageService } from '../../../services/message.service';

declare var bootstrap: any;

@Component({
  selector: 'app-szallas-list',
  standalone: true,
  imports: [NgForOf, FormsModule],
  templateUrl: './szallas-list.component.html',
  styleUrl: './szallas-list.component.scss'
})
export class SzallasListComponent implements OnInit {

  formModal: any;
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


  constructor(
    private api: ApiService,
    private message: MessageService
  ) { }

  ngOnInit(): void {
    this.formModal = new bootstrap.Modal('#staticBackdrop')
    this.getAllSzallas();
  }

  getAllSzallas() {
    this.api.selectAll('accomodations').then(res => {
      this.accomodations = res.data;
    })
  }

  selectHotel(id: number) {
    this.api.selectOne('accomodations', id).then(res => {
      this.selectedAccomodation = res.data[0];
    })

  }

  async save() {
    if (this.selectedAccomodation.id != 0) {
      await this.api.update('accomodations', this.selectedAccomodation.id, this.selectedAccomodation).then(res => {
        this.message.show('success', 'Ok', 'A szállás módosítva')
        this.selectedAccomodation = {
          id: 0,
          name: '',
          description: '',
          address: '',
          capacity: 0,
          basePrice: 0,
          active: false
        }
      })
      this.getAllSzallas();
    }
  }

  delete() {
    this.api.delete('accomodations', this.selectedAccomodation.id).then(res => {
      this.message.show('info', 'Törlés', 'Szállás sikeresen törölve');
      this.selectedAccomodation = {
        id: 0,
        name: '',
        description: '',
        address: '',
        capacity: 0,
        basePrice: 0,
        active: false
      }
      this.getAllSzallas();
    })

  }
}
