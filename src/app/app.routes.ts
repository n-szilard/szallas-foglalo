import { Routes } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { LostpassComponent } from './components/user/lostpass/lostpass.component';
import { LogoutComponent } from './components/user/logout/logout.component';
import { NotfoundComponent } from './components/system/notfound/notfound.component';
import { PassmodComponent } from './components/user/passmod/passmod.component';
import { HomeComponent } from './components/system/home/home.component';
import { AccomodationInfoComponent } from './components/accomodation/accomodation-info/accomodation-info.component';
import { SzallasUploadComponent } from './components/admin/szallas-upload/szallas-upload.component';
import { BookingComponent } from './components/accomodation/booking/booking.component';
import { SzallasListComponent } from './components/admin/szallas-list/szallas-list.component';
import { UserListComponent } from './components/admin/user-list/user-list.component';
import { BookingConfirmComponent } from './components/accomodation/booking-confirm/booking-confirm.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'lostpass', component: LostpassComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'passmod', component: PassmodComponent },
    { path: 'home', component: HomeComponent},
    { path: 'info/:id', component: AccomodationInfoComponent},
    { path: 'szallasupload', component: SzallasUploadComponent},
    { path: 'szallaslist', component: SzallasListComponent},
    { path: 'booking/:id', component: BookingComponent},
    { path: 'manageusers', component: UserListComponent},
    { path: 'bookingconfirmed', component: BookingConfirmComponent},


    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: '**', component: NotfoundComponent}

];
