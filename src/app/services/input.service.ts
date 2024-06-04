import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InputService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  SCORE(score: number, playerData: { id: number; lorv: string }, match: any) {
    if (playerData.lorv === 'local') {
      const addLSUrl = `http://localhost/CloudMatch/CloudMatch-BACKEND/php/redis/input/addLocalSCORE.php?score=${score}&player=${playerData.id}&match=${match.match_id}`;
      return this.http.post(addLSUrl, this.httpOptions);
    } else {
      const addVSUrl = `http://localhost/CloudMatch/CloudMatch-BACKEND/php/redis/input/addVisitorSCORE.php?score=${score}&player=${playerData.id}&match=${match.match_id}`;
      return this.http.post(addVSUrl, this.httpOptions);
    }
  }

  FOUL(playerData: { id: number; lorv: string }, match: any) {
    if (playerData.lorv === 'local') {
      const addLFUrl = `http://localhost/CloudMatch/CloudMatch-BACKEND/php/redis/input/addLocalFOUL.php?player=${playerData.id}&match=${match.match_id}`;
      return this.http.post(addLFUrl, this.httpOptions);
    } else {
      const addVFUrl = `http://localhost/CloudMatch/CloudMatch-BACKEND/php/redis/input/addVisitorFOUL.php?player=${playerData.id}&match=${match.match_id}`;
      return this.http.post(addVFUrl, this.httpOptions);
    }
  }

  PERIOD() {
    const PERIODUrl =
      'http://localhost/CloudMatch/CloudMatch-BACKEND/php/redis/input/PERIOD.php';
    return this.http.post(PERIODUrl, this.httpOptions);
  }

  resetPERIOD() {
    const resetPERIODurl =
      'http://localhost/CloudMatch/CloudMatch-BACKEND/php/redis/input/resetPERIOD.php';
    return this.http.put(resetPERIODurl, this.httpOptions);
  }

  TIME() {
    const TIMEurl =
      'http://localhost/CloudMatch/CloudMatch-BACKEND/php/redis/input/TIME.php';
    return this.http.put(TIMEurl, this.httpOptions);
  }

  resetTIME() {
    const resetTIMEurl =
      'http://localhost/CloudMatch/CloudMatch-BACKEND/php/redis/input/resetTIME.php';
    return this.http.put(resetTIMEurl, this.httpOptions);
  }
}
