import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { JobService } from 'src/app/services/job.services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from 'src/app/models/job';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.css'],
})
export class JobFormComponent implements OnInit {
  address: any;
  id!: string;
  jobForm: FormGroup = new FormGroup({
    id: new FormControl(),
    job_number: new FormControl("",Validators.required),
    job_title: new FormControl("",Validators.required),
    job_start_date: new FormControl("",Validators.required),
    job_close_date: new FormControl("",Validators.required),
    experience_required: new FormControl("", [Validators.required]),
    number_of_openings: new FormControl("",Validators.required),
    job_notes: new FormControl("",Validators.required),
  });

  constructor(
    private _snackBar: MatSnackBar,
    private jobService: JobService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id) {
        this.getJobById(this.id);
      }
    });
  }

  onSubmit() {
    if (this.id) {
      this.updateJob();
      return;
    }
    this.addJob();
  }

  getJobById(id: string) {
    this.jobService.getJobByid(id).subscribe(
      (res) => {
        this.jobForm.setValue(res);
        // this.job = res;
      },
      (err) => console.error(err)
    );
  }

  updateJob() {
    this.jobService.updateJob(this.jobForm.value).subscribe((res) => {
      if (res) {
        this._snackBar.open('Job is updated successfully!!', 'Ok');
        this.router.navigateByUrl('/');
      }
    });
  }

  addJob() {
    this.jobForm.patchValue({ id: Number(this.jobService.lastJobId + 1) });
    this.jobService.addJob(this.jobForm.value).subscribe((res) => {
      this._snackBar.open('Job is created successfully!!', 'Ok');
      this.router.navigateByUrl('/');
    });
  }
}
