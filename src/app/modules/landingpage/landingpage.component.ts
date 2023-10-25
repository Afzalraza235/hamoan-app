import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/_services';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {
  public user: any;
  constructor(
    private authenticationService: AuthenticationService
  ) { 
    this.user = this.authenticationService.get_currentUserValue();
  }

  ngOnInit(): void {
  }

}
