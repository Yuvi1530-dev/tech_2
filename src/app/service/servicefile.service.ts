import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class ServicefileService {
  Api: any = '';
  key: any = ''
  constructor(private http: HttpClient) {
    this.Api = environment.api;
  }

  getData(model: any, mode: any,url:any): any {
    const httpHeaders: any = new HttpHeaders({  });
    let auth_token="Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjQxODFiNTAxNzYxY2IwZDExNGE5NWRiNjFhMjdiOCIsInN1YiI6IjY1OGJjYjEyOWVjZjE4MGYzMWYzOWE5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EEHFW6TDkWADKHXH8RdSqxCxYpM-Uwlk4lO4QSCjWXY"
    if (mode == "Movie_list") {
      return this.http.get("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc", {headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': auth_token})})

    } else if (mode == 'POST') {
      let body = this.serializeObj(model);

      return this.http.post(this.Api + url, body, { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }) })

    }else if(mode == "weather_api") {
      return this.http.get("http://api.weatherapi.com/v1/current.json?key=2eeec65bf6ec4970b25101731232712 &q=Coimbatore&aqi=yes", {headers: new HttpHeaders({ 'Content-Type': 'application/json'})})

    } 
  }

  private serializeObj(obj: any) {
		var result = [];
		for (var property in obj)
			result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

		return result.join("&");
	}

  //Slect Box Data Pass
  private checkboxValueSubject = new BehaviorSubject<{ value: any; isChecked: boolean }>({
    value: null,
    isChecked: false,
  });
  checkboxValue$ = this.checkboxValueSubject.asObservable();

  setCheckboxValue(value: any, isChecked: boolean): void {
    this.checkboxValueSubject.next({ value, isChecked });
  }

  //Used fro select all
  private SelectAllSubject = new BehaviorSubject<{ value: any; isChecked: boolean }>({
    value: null,
    isChecked: false,
  });
  selectBox$ = this.SelectAllSubject.asObservable();

  setSelectall(value: any, isChecked: boolean): void {
    this.SelectAllSubject.next({ value, isChecked });
  }
  setCookie(cname: any, cvalue: any, exdays: any) {
		const d = new Date();
		d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
		let expires = "expires=" + d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";

	}
	getCookie(cname: any) {
		let name = cname + "=";
		let decodedCookie = decodeURIComponent(document.cookie);

		let ca = decodedCookie.split(";");
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == " ") {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}
  // getTemplateData() {
  //   return {
  //     headerTemplate: '<span>Header Sample</span>',
  //     rowTemplate: '<span>Row Sample</span>',
  //   };
  // }
}
