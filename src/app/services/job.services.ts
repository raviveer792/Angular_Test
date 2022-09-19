import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../models/job';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  jobList!: Job[];
  api: string = 'http://localhost:3000';
  lastJobId: number = 0;
  constructor(private http: HttpClient) {}

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.api}/jobs`);
  }

  getJobByid(id: string): Observable<Job> {
    return this.http.get<Job>(`${this.api}/jobs/${id}`);
  }

  addJob(job: Job): Observable<Job> {
    return this.http.post<Job>(`${this.api}/jobs`, job);
  }

  updateJob(job: Job): Observable<Job> {
    return this.http.put<Job>(`${this.api}/jobs/${job.id}`, job);
  }

  deleteJob(id: string): Observable<Job> {
    return this.http.delete<Job>(`${this.api}/jobs/${id}`);
  }
}
