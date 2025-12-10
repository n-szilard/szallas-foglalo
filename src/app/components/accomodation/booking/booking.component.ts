import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule, FullCalendarModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent {
  checkIn!: string;
  checkOut!: string;
  persons: number = 1;
  basePrice: number = 12000;
  totalPrice: number = 0;

  
  bookedDates = ['2025-12-15', '2025-12-18', '2025-12-20'];

  calendarOptions: any;

  constructor() {
    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      selectable: true,
      selectMirror: true,
      select: this.handleDateSelect.bind(this),
      dayCellClassNames: this.dayClass.bind(this),
      validRange: {
        start: new Date().toISOString().split('T')[0]
      }
    };
  }

  
selectedDates: string[] = [];

handleDateSelect(selectInfo: any) {
  const startStr = selectInfo.startStr;
  const endDate = new Date(selectInfo.end);
  endDate.setDate(endDate.getDate() - 1);
  const endStr = endDate.toISOString().split('T')[0];

  const days = this.getDatesBetween(startStr, selectInfo.end);

  // nincs foglalt nap ellenorzes
  const isBooked = days.some(d => this.bookedDates.includes(d));
  if (isBooked) {
    alert('A kiválasztott időszakban van már foglalt nap!');
    return;
  }

  this.checkIn = startStr;
  this.checkOut = endStr;


  this.selectedDates = days;

  this.calculatePrice();
}


// színezése
dayClass(arg: any) {
  const dateStr = arg.date.toISOString().split('T')[0];

  if (this.bookedDates.includes(dateStr)) {
    return ['booked-day']; 
  } else if (this.selectedDates.includes(dateStr)) {
    return ['selected-day'];
  } else {
    return ['available-day'];
  }
}
  

getDatesBetween(start: string, end: string) {
  const dates = [];
  let current = new Date(start);
  const last = new Date(end);
  last.setDate(last.getDate() - 1);
  while (current <= last) {
    dates.push(current.toISOString().split('T')[0]);
    current.setDate(current.getDate() + 1);
  }
  return dates;
}


  calculatePrice() {
    if (!this.checkIn || !this.checkOut || this.persons < 1) {
      this.totalPrice = 0;
      return;
    }
    const inDate = new Date(this.checkIn);
    const outDate = new Date(this.checkOut);
    const nights = (outDate.getTime() - inDate.getTime()) / (1000 * 60 * 60 * 24);
    this.totalPrice = nights > 0 ? this.basePrice * this.persons * nights : 0;
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
  }
}
