import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
  })

  export class LeagueService{
    private httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };


      createLeague(){
        
      }




  }