import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Team } from '../models/team';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  createTeam(team: Team) {
    const createTeamUrl =
      'http://localhost/CloudMatch-BACKEND/php/teams_controller/createTeam.php';
    const teamBody = JSON.stringify(team);
    return this.http.post(createTeamUrl, teamBody, this.httpOptions);
  }

  getTeam(team: string){
    const getTeamUrl = `http://localhost/CloudMatch-BACKEND/php/teams_controller/getTeam.php?team_name="${team}"`;
    return this.http.get(getTeamUrl, this.httpOptions)
  }

  getTeamPlayers(teamId: number){
    const getTeamPlayersUrl = `http://localhost/CloudMatch-BACKEND/php/teams_controller/getTeamPlayers.php?team_id=${teamId}`;
    return this.http.get(getTeamPlayersUrl, this.httpOptions);
  }


}
