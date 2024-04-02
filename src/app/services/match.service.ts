import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Match } from '../models/match';

@Injectable({ providedIn: 'root' })

export class MatchService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  createMatch(
    match: Match,
    leagueId: number,
    localId: number,
    visitorId: number,
    refereeId: number
  ) {
    const createMatchUrl = `http://localhost/CloudMatch-BACKEND/php/match_controller/createMatch.php?league_id=${leagueId}&referee_id=${refereeId}&local_id=${localId}&visitor_id=${visitorId}`;
    const matchBody = JSON.stringify(match);
    return this.http.post(createMatchUrl, matchBody, this.httpOptions);
  }

  matchCalendar(leagueId: number){
    const matchCalendarUrl = `http://localhost/CloudMatch-BACKEND/php/match_controller/matchCalendar.php?league_id=${leagueId}`;
    return this.http.get(matchCalendarUrl, this.httpOptions);
  }
}
