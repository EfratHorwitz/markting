import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import data from "../assets/data.json";
import {HttpClient, HttpHeaders} from "@angular/common/http"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  d: any = data;
  data1: any[] = [];
  dSlice: any = [];
  dd: string = "";
  sum: number = 0;
  x:any;
  constructor(private http:HttpClient) { }
  ngOnInit(): void {
    this.http.get<any>("https://vpn-marketing66.herokuapp.com/interview-test-result").subscribe(res=>this.data1=res);


    // this.data1 = this.d.data;

    const result = this.data1.reduce((arr, item) => {
      const key = item.value;
      let i = arr.get(key) || Object.assign({}, item, {
      });

      i.first_name = i.first_name.replace(/.+?(?=-)(?=-).+?/, '');
      i.last_name = i.last_name.replace(/(?=-).+?$/, '');
      this.sum += i.value;

      return arr.set(item.value, i);
    }, new Map)
    console.log("sum", this.sum);
    this.d.data = Array.from(result.values());

    
  }
  
  Sum(): void {
    let headers=new HttpHeaders().append('content-type', 'application/x-www-form-urlencoded');
    this.http.post<any>("https://vpn-marketing66.herokuapp.com/interview-test-result", { session_id: this.sum },{headers:headers}
    ).subscribe(res=>this.x=res);
  }

}
