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

  }

  clearPictures() {
    
  }

  uploadFile() {

  }


  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;
  }
}
