import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import your components for routing
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { AddHousesComponent } from './components/add-house/add-house.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  {path: 'add-house',component:AddHousesComponent}
  // other routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
