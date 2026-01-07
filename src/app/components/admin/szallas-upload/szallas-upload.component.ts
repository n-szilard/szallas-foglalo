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

  selectedFiles: File[] = [];

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
  ) { }

  upload() {

    let insertId = 0;

    if (this.newHotel.name == '' || this.newHotel.description == '' || this.newHotel.address == '' || this.newHotel.capacity == 0 || this.newHotel.basePrice == 0) {
      this.message.show('danger', 'Hiba', 'Nem adtál meg minden adatot!')
      return;
    }

    if (this.newHotel.capacity <= 0 || this.newHotel.basePrice <= 0) {
      this.message.show('danger', 'Hiba', 'Nem megfelelő adatokat adtál meg!');
      return;
    }

    this.api.insert('accomodations', this.newHotel).then(res => {
      insertId = res.data.insertId
      console.log(insertId)
      this.message.show('success', 'Ok', 'A szállás hozzáadva');
      if (this.selectedFiles.length > 0) {
        this.uploadFiles(insertId);
      }
    })

    this.newHotel = {
      id: 0,
      name: '',
      description: '',
      address: '',
      capacity: 0,
      basePrice: 0,
      active: false
    }
  }

  clearPictures() {

  }


  //TODO: kép feltöltés
  uploadFiles(accomodationId: number) {
    console.log(accomodationId)
    const formData = new FormData();

    this.selectedFiles?.forEach(file => {
      formData.append('images', file);
    });

    this.api.upload(formData, accomodationId).then(res => {

    })
  }


  onFileSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }
}
