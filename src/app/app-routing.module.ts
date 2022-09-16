import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobFormComponent } from './components/job-form/job-form.component';
import { JobComponent } from './components/job/job.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/jobs',
    pathMatch: 'full',
  },
  {
    path: 'jobs',
    component: JobComponent,
    children: [
      {
        path: 'new',
        component: JobFormComponent,
      },
    ],
  },
  {
    path: 'jobs/:id',
    component: JobComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
