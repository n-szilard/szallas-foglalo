import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent {
  checkIn!: string;
  checkOut!: string;
  persons: number = 1;

  basePrice: number = 12000; // Ft / fő / éj
  totalPrice: number = 0;

  constructor() {}

  ngDoCheck() {
    this.calculatePrice();
  }

  calculatePrice() {
    if (!this.checkIn || !this.checkOut || this.persons < 1) {
      this.totalPrice = 0;
      return;
    }

    const inDate = new Date(this.checkIn);
    const outDate = new Date(this.checkOut);

    const nights = (outDate.getTime() - inDate.getTime()) / (1000 * 60 * 60 * 24);

    if (nights > 0) {
      this.totalPrice = this.basePrice * this.persons * nights;
    } else {
      this.totalPrice = 0;
    }
  }

  submitBooking() {

    const data = {
      checkIn: this.checkIn,
      checkOut: this.checkOut,
      persons: this.persons,
      total: this.totalPrice,
      status: "várakozik visszaigazolásra"
    };

    console.log("FOGLALÁS ELKÜLDVE:", data);

    // TODO: API hívás backendre
    // TODO: email küldés usernek + adminnak
  }
}
