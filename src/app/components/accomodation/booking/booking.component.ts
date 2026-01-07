import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { Accomodation } from '../../../interfaces/accomodation';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule, FullCalendarModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  checkIn!: string;
  checkOut!: string;
  persons: number = 1;
  basePrice: number = 0;
  totalPrice: number = 0;

  bookedHotel: Accomodation = {
    id: 0,
    name: '',
    description: '',
    address: '',
    capacity: 0,
    basePrice: 0,
    active: false
  }

  id!: number;

  bookedDates = ['2025-12-15', '2025-12-18', '2025-12-20'];

  calendarOptions: any;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private auth: AuthService,
    private message: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getAccomodationInfo(this.id);

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

  getAccomodationInfo(id: number) {
    this.api.selectOne('accomodations', id).then(res => {
      this.bookedHotel = res.data[0];
      this.basePrice = this.bookedHotel.basePrice;
    });
  }

  handleDateSelect(selectInfo: any) {
    const startStr = selectInfo.startStr;
    const endDate = new Date(selectInfo.end);
    endDate.setDate(endDate.getDate());
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
    let isLoggedIn = false;

    this.auth.isLoggedIn$.subscribe(res => {
      isLoggedIn = res;
    });

    if (!isLoggedIn) {
      this.message.show('danger', 'Nincs bejelentkezve', 'A foglaláshoz hozzon létre fiókot vagy jelentkezzen be!');
      return;
    }

    let loggedInUser = this.auth.loggedUser();
    console.log(loggedInUser)


    let data = {
      "template": "booking",
      "to": loggedInUser[0].email,
      "subject": "Foglalás",
      "data": {
        "name": loggedInUser[0].name,
        "startDate": this.checkIn,
        "endDate": this.checkOut,
        "persons": this.persons,
        "totalPrice": this.totalPrice
      }
    }
    this.api.sendMail(data);
    this.router.navigate(['/bookingconfirmed']);
  }
}
