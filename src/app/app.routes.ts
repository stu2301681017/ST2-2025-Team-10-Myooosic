import { Routes } from '@angular/router';
import { Home } from '../routes/home/home';
import { Login } from '../routes/login/login';
import { Register } from '../routes/register/register';
import { Saved } from '../routes/saved/saved';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'saved', component: Saved }
];