import { Component } from '@angular/core';
import { Accomodation } from '../../../interfaces/accomodation';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { MessageService } from '../../../services/message.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-szallas-upload',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './szallas-upload.component.html',
  styleUrl: './szallas-upload.component.scss'
})
export class SzallasUploadComponent {

  selectedFiles?: FileList;

  newHotel: Accomodation = {
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
    private message: MessageService,
    private auth: AuthService
  ) {}

  upload() {
    if (this.newHotel.name == '' || this.newHotel.description == '' || this.newHotel.address == '' || this.newHotel.capacity == 0 || this.newHotel.basePrice == 0) {
      this.message.show('danger', 'Hiba', 'Nem adtál meg minden adatot!')
      return;
    }

    if (this.newHotel.capacity <= 0 ||  this.newHotel.basePrice <= 0) {
      this.message.show('danger', 'Hiba', 'Nem megfelelő adatokat adtál meg!');
      return;
    }

    this.api.insert('accomodations', this.newHotel).then(res => {
      this.message.show('success', 'Ok', 'A szállás hozzáadva');
    })
  }

  clearPictures() {
    
  }


  //TODO: kép feltöltés
  uploadFile() {

  }


  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;
  }
}
