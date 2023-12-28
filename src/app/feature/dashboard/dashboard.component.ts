import { Component, OnInit } from '@angular/core';
import { ServicefileService } from '../../service/servicefile.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dataSource : any=[];
  constructor(public service :ServicefileService) { }
  ngOnInit(): void {
      this.service.getData('',"weather_api","").subscribe((res: any)=>{
        this.dataSource=res;
      })
    }

}
