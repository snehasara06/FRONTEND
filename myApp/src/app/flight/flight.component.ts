import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlightService } from '../Services/flight.service';
import { Flight } from '../shared/flight.model';
declare var M: any;
@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss'],
  providers: [FlightService]

})
export class FlightComponent implements OnInit {

  constructor(public flightService: FlightService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshFlight();
  }
  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.flightService.newTicket = {
      _id:"",
      firstname: "",
      lastname: "",
      departure: "",
      arrival: "  "
    }
  }
  onSubmit(form: NgForm) {
    if (form.value.firstname == "") {
      this.flightService.postTicket(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshFlight();
        M.toast({
          html: 'Saved Successfully', classes: 'rounded'
        });
      })
  }
    else {
      this.flightService.putTicket(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshFlight();
        M.toast({
          html: 'Updated Successfully', classes: 'rounded'
        });
      });
    };

  }
  refreshFlight() {
    this.flightService.getTicket().subscribe((res) => {
      this.flightService.ticket = res as Flight[];
    });
  }
  onEdit(fly: Flight) {
    this.flightService.newTicket = fly;
  }
  onDelete(_id: string, form: NgForm) {
    console.log(_id);
    
    if (confirm('Delete ticket?') == true) {
      this.flightService.deleteTicket(_id).subscribe((res) => {
        this.refreshFlight();
        this.resetForm(form);
        M.toast({
          html: 'Deleted successfully', classes: 'rounded'
        });
      })
    }
  }
}
