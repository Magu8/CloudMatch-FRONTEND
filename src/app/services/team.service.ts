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
      'http://localhost/CloudMatch/CloudMatch-BACKEND/php/teams_controller/createTeam.php';
    const teamBody = JSON.stringify(team);
    return this.http.post(createTeamUrl, teamBody, this.httpOptions);
  }

  getTeam(team: string) {
    const getTeamUrl = `http://localhost/CloudMatch/CloudMatch-BACKEND/php/teams_controller/getTeam.php?team_name="${team}"`;
    return this.http.get(getTeamUrl, this.httpOptions);
  }

  getMyTeam(delegateId: number) {
    const getMyTeamUrl = `http://localhost/CloudMatch/CloudMatch-BACKEND/php/teams_controller/getMyTeam.php?delegate_id=${delegateId}`;
    return this.http.get(getMyTeamUrl, this.httpOptions);
  }

  getAllTeams() {
    const geAllTeamsUrl =
      'http://localhost/CloudMatch/CloudMatch-BACKEND/php/teams_controller/getAllTeams.php';
    return this.http.get(geAllTeamsUrl, this.httpOptions);
  }

  getTeamPlayers(teamId: number) {
    const getTeamPlayersUrl = `http://localhost/CloudMatch/CloudMatch-BACKEND/php/teams_controller/getTeamPlayers.php?team_id=${teamId}`;
    return this.http.get(getTeamPlayersUrl, this.httpOptions);
  }

  participateMyteam(teamId: number, leagueId: number) {
    const participateMyTeamUrl = `http://localhost/CloudMatch/CloudMatch-BACKEND/php/teams_controller/participateTeamInLeague.php?team_id=${teamId}&league_id=${leagueId}`;
    return this.http.post(participateMyTeamUrl, this.httpOptions);
  }

  addTeamToFaves(teamId: number, userId: number){
    const addTeamToFavesUrl = `http://localhost/CloudMatch/CloudMatch-BACKEND/php/teams_controller/addTeamToFaves.php?user_id=${userId}&favTeam_id=${teamId}`;
    return this.http.put(addTeamToFavesUrl, this.httpOptions);

  }

  removeTeamFromFaves(teamId: number, userId: number){
    const removeTeamFromFavesUrl = `http://localhost/CloudMatch/CloudMatch-BACKEND/php/teams_controller/removeFavoriteTeam.php?user_id=${userId}&favTeam_id=${teamId}`;
    return this.http.put(removeTeamFromFavesUrl, this.httpOptions);

  }

  getFavoriteTeamData(userId: number){
    const getFavoriteDataUrl = `http://localhost/CloudMatch/CloudMatch-BACKEND/php/teams_controller/getFavoriteTeams.php?user_id=${userId}`;
    return this.http.get(getFavoriteDataUrl, this.httpOptions)

  }

  getStadistics(teamId: number){
    const getStadisticsUrl = `http://localhost/CloudMatch/CloudMatch-BACKEND/php/teams_controller/getStadistics.php?team_id=${teamId}`;
    return this.http.get(getStadisticsUrl, this.httpOptions)
  }

  searchTeam(teamName: string) {
    const searchTeamUrl = `http://localhost/CloudMatch/CloudMatch-BACKEND/php/teams_controller/searchTeam.php?search_name=${teamName}`;
    return this.http.get(searchTeamUrl, this.httpOptions)
  }
}
