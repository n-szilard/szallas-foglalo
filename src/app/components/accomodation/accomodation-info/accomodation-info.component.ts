import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-accomodation-info',
  standalone: true,
  imports: [
    CommonModule,RouterModule
  ],
  templateUrl: './accomodation-info.component.html',
  styleUrl: './accomodation-info.component.scss'
})
export class AccomodationInfoComponent {
  hotel = {
    name: "Miami Beach",
    rating: 8.2,
    reviewText: "Nagyon jó (7433 értékelés)",
    address: "6500 Baja, Miami Beach",
    price: 40000,

    features: [
      { title: "Nagyszerű elhelyezkedés", desc: "A vendégek kedvelik a környéket." },
      { title: "Közeli látnivalók", desc: "Sétatávolságra a tengerpart." },
      { title: "Wellness és kényelem", desc: "Spa, medencék, éttermek." }
    ],

    nearby: [
      { place: "Miami tengerpart", time: "1 perc" },
      { place: "Szálloda", time: "1 perc" },
      { place: "BP repülőtér", time: "150 perc autóval" }
    ],

    amenities: [
      "Strand hozzáférés",
      "3 kültéri medence",
      "Reggeli elérhető",
      "Wellness szolgáltatások",
      "Üzleti központ"
    ],

    description:
      "Luxus vízparti hotel, vásárlási és szórakozási lehetőségekkel a közelben.",

    bottomImages: [
      '/assets/images/slider_01.jpg',
      '/assets/images/slider_01.jpg',
      '/assets/images/slider_01.jpg'
    ]
  };
}
