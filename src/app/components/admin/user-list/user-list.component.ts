import { Component, OnInit } from '@angular/core';
import { User } from '../../../interfaces/user';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../../../services/message.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  selectedUser: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
    confirm: '',
    role: ''
  }

  constructor(
    private api: ApiService,
    private message: MessageService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.api.selectAll('users').then(res => {
      this.users = res.data;
    })
  }

  selectUser(id: number) {
    this.api.selectOne('users', id).then(res => {
      this.selectedUser = res.data[0];
    })
  }

  async save() {
    if (this.selectedUser.id != 0) {
      await this.api.update('users', this.selectedUser.id!, this.selectedUser).then(res => {
        this.message.show('success', 'Ok', 'A felhasználó módosítva');
        this.selectedUser = {
          id: 0,
          name: '',
          email: '',
          password: '',
          confirm: '',
          role: ''
        }
      });

      this.getAllUsers();
    }
  }

  async delete() {
    if (this.selectedUser.id != this.auth.loggedUser()[0].id) {
      await this.api.delete('users', this.selectedUser.id!).then(res => {
        this.message.show('info', 'Törlés', 'Felhasználó sikeresen törölve');
        this.selectedUser = {
          id: 0,
          name: '',
          email: '',
          password: '',
          confirm: '',
          role: ''
        }
      });
  
      this.getAllUsers();
    } else {
      this.message.show('danger', 'Hiba', 'Nem törölheti az admin fiókot!')
    }
  }
}
