import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteGuardService } from './core/route-guard.service';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { ProfileDetailComponent } from './pages/profile-detail/profile-detail.component';
import { ProfileListComponent } from './pages/profile-list/profile-list.component';
import { DataSourcesComponent } from './pages/data-sources/data-sources.component';

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent, 
    canActivate: [ RouteGuardService ],
    data: { title: 'VastForce' },
  },
  { 
    path: 'login', 
    component: LoginComponent,
    data: { title: 'VastForce' },
  },
  { 
    path: 'callback', 
    component: LoginComponent,
    canActivate: [ RouteGuardService ],
    data: { title: 'VastForce' },
  },
  { 
    path: 'about', 
    component: AboutComponent, 
    data: { title: 'About VastForce' },
  },
  { 
    path: 'app/query-permissions', 
    component: AboutComponent, 
    data: { title: 'Permission Query Tool' },
  },
  {
    path: 'app/data-sources',
    component: DataSourcesComponent, 
    canActivate: [ RouteGuardService ],
    data: { title: 'Permission Query Tool' },
  },
  { 
    path: 'app/profiles', 
    component: ProfileListComponent, 
    canActivate: [ RouteGuardService ],
    data: { title: 'Profiles' },
  },
  { 
    path: 'app/profile/:id', 
    component: ProfileDetailComponent, 
    canActivate: [ RouteGuardService ],
    data: { title: 'Profile details' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
