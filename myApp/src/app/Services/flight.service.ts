import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';

import { Flight } from '../shared/flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  newTicket!: Flight;
  ticket: Flight[] = [];
  readonly url='http://localhost:8000/flightData';
  constructor(public http:HttpClient) { }
  postTicket(fly:Flight){
    return this.http.post(this.url,fly);
  }
  getTicket(){
    return this.http.get(this.url);
  }
  putTicket(fly:Flight){
    return this.http.put(this.url+`/${fly.firstname}`,fly);
  }
  deleteTicket(firstname:string){
    //  return console.log(firstname);
    
    return this.http.delete(this.url+`/${firstname}`)
  }
}
