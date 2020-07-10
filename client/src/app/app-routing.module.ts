import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteGuardService } from './core/route-guard.service';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { ProfileDetailComponent } from './pages/profile-detail/profile-detail.component';
import { ProfileListComponent } from './pages/profile-list/profile-list.component';
import { DataSourcesComponent } from './pages/data-sources/data-sources.component';
import { DataSourceAddComponent } from './pages/data-source-add/data-source-add.component';
import { DataSourceViewComponent } from './pages/data-source-view/data-source-view.component';
import { JobDetailsComponent } from './pages/job-details/job-details.component';
import { DataSourceCallbackComponent } from './pages/data-source-callback/data-source-callback.component';

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
    path: 'app/data-sources',
    component: DataSourcesComponent, 
    canActivate: [ RouteGuardService ],
    data: { title: 'Data Sources' },
  },
  {
    path: 'app/data-source/new',
    component: DataSourceAddComponent, 
    canActivate: [ RouteGuardService ],
    data: { title: 'New Data Source' },
  },
  {
    path: 'app/data-source/callback',
    component: DataSourceCallbackComponent, 
    canActivate: [ RouteGuardService ],
    data: { title: 'New Data Source' },
  },
  {
    path: 'app/data-source/:id',
    component: DataSourceViewComponent, 
    canActivate: [ RouteGuardService ],
    data: { title: 'New Data Source' },
  },
  {
    path: 'app/job/:id',
    component: JobDetailsComponent, 
    canActivate: [ RouteGuardService ],
    data: { title: 'Job Status' },
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
