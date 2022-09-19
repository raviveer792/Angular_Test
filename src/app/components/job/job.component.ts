import { Component, OnInit, ViewChild } from '@angular/core';
import { Job } from 'src/app/models/job';
import { JobService } from 'src/app/services/job.services';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css'],
})
export class JobComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'job_title',
    'job_start_date',
    'job_close_date',
    'experience_required',
    'number_of_openings',
    'job_notes',
    'action',
  ];
  dataSource = new MatTableDataSource<Job>();
  jobList!: Job[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private jobService: JobService, private _snackBar: MatSnackBar) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getJobs();
  }

  getJobs() {
    this.jobService.getJobs().subscribe(
      (res) => {
        this.dataSource.data = res;
        this.jobService.lastJobId = Number(res[res.length - 1].id);
      },
      (err) => console.error(err)
    );
  }

  // edit(jobId: string) {
  //   this.jobService.updateJob(jobId).subscribe((res) => {
  //     if (res) {
  //       this._snackBar.open('Job is updated successfully!!', 'Ok');
  //     }
  //   });
  // }

  delete(jobId: string) {
    this.jobService.deleteJob(jobId).subscribe((res) => {
      if (res) {
        this.getJobs();
        this._snackBar.open('Job is Deleted successfully!!', 'Ok');
      }
    });
  }
}
