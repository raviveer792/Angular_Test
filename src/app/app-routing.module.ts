import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobFormComponent } from './components/job-form/job-form.component';
import { JobComponent } from './components/job/job.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/jobs',
    pathMatch: 'full',
  },
  {
    path: 'jobs',
    component: JobComponent,
  },
  {
    path: 'jobs/new',
    component: JobFormComponent,
  },
  {
    path: 'jobs/:id',
    component: JobFormComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
