import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from '../../../services/message.service';
import { Booking } from '../../../interfaces/booking';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss'
})
export class BookingsComponent implements OnInit {

  bookings: Booking[] = [];

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private message: MessageService
  ) {}

  ngOnInit(): void {
    this.getUserBookings();
  }

  getUserBookings() {
    if (this.loginCheck()) {
      let loggedUser = this.auth.loggedUser();
      this.api.selectAll('userbookings/'+loggedUser[0].id).then(res => {
        this.bookings = res.data;
      })
    }
  }

  loginCheck() {
    let isLoggedIn = false;

    this.auth.isLoggedIn$.subscribe(res => {
      isLoggedIn = res;
    });

    if (!isLoggedIn) {
      this.message.show('danger', 'Nincs bejelentkezve', 'A foglaláshoz hozzon létre fiókot vagy jelentkezzen be!');
      return false;
    }
    return true;
  }

  selectBooking(id: number) {

  }
}
