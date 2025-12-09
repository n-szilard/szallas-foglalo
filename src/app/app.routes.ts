import { Routes } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { LostpassComponent } from './components/user/lostpass/lostpass.component';
import { LogoutComponent } from './components/user/logout/logout.component';
import { NotfoundComponent } from './components/system/notfound/notfound.component';
import { PassmodComponent } from './components/user/passmod/passmod.component';
import { HomeComponent } from './components/system/home/home.component';
import { SzallasUploadComponent } from './components/admin/szallas-upload/szallas-upload.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'lostpass', component: LostpassComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'passmod', component: PassmodComponent },
    { path: 'home', component: HomeComponent},
    { path: 'szallasupload', component: SzallasUploadComponent},

    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: '**', component: NotfoundComponent}

];
