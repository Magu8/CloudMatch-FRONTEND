import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { League } from '../models/league';

@Injectable({
  providedIn: 'root',
})
export class LeagueService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  createLeague(league: League) {
    const createLeagueUrl =
      'http://localhost/CloudMatch-BACKEND/php/leagues_controller/createLeague.php';
    const leagueBody = JSON.stringify(league);
    return this.http.post(createLeagueUrl, leagueBody, this.httpOptions);
  }

  deleteLeague(leagueId: number) {
    const deleteLeagueUrl = `http://localhost/CloudMatch-BACKEND/php/leagues_controller/deleteLeague.php?league_id=${leagueId}`;
    return this.http.delete(deleteLeagueUrl, this.httpOptions);
  }

  getLeagueParticipants(leagueId: number) {
    const getLeagueParticipantsUrl = `http://localhost/CloudMatch-BACKEND/php/leagues_controller/getLeagueParticipants.php?league_id=${leagueId}`;
    return this.http.get(getLeagueParticipantsUrl, this.httpOptions);
  }

  getLeague(leagueId: number) {
    const getLeagueUrl = `http://localhost/CloudMatch-BACKEND/php/leagues_controller/getLeague.php?league_id=${leagueId}`;
    return this.http.get(getLeagueUrl, this.httpOptions);
  }

  getAllLeagues() {
    const getAllLeaguesUrl =
      'http://localhost/CloudMatch-BACKEND/php/leagues_controller/getAllLeagues.php';
    return this.http.get(getAllLeaguesUrl, this.httpOptions);
  }


  addLeagueScore(leagueId: number, teamId: number) {
    const addLeagueScoreUrl = `http://localhost/CloudMatch-BACKEND/php/leagues_controller/addLeagueScore?league_id=${leagueId}&participant_id=${teamId}`;
    return this.http.put(addLeagueScoreUrl, this.httpOptions)
  }

}
