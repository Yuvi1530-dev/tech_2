import { Component, OnInit } from '@angular/core';
import { ServicefileService } from '../../service/servicefile.service';
import { MatTableDataSource } from '@angular/material/table';
export interface PeriodicElement {
  position:any;
  release_date: any;
  title: any;
  vote: any;
  rating: any;
}
@Component({
  selector: 'app-move-list',
  templateUrl: './move-list.component.html',
  styleUrls: ['./move-list.component.css']
})

export class MoveListComponent implements OnInit {
  
  displayedColumns: string[] = ['position','title', 'release_date','vote','rating'];
 
  clickedRows = new Set<PeriodicElement>();
  constructor(public service :ServicefileService) { }
  dataSource = new MatTableDataSource<PeriodicElement[]>();
  ngOnInit(): void {
    this.service.getData('',"Movie_list","").subscribe((res: any)=>{
      let arrayData=res.results;
      let dataArr:any=[]
   
      arrayData.forEach((element: any,index:any) => {
        dataArr.push({
          position:index+1,
          release_date:element.release_date,
          title : element.title,
          vote :  element.vote_count,
          rating : element.vote_average
        })
      });
      this.dataSource=dataArr;
      console.log(this.dataSource)
    })
  }

}
