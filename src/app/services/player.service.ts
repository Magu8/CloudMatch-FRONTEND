import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  createPlayer(player: Player, teamId: number) {
    const createPlayerUrl = `http://localhost/CloudMatch-BACKEND/php/players_controller/createPlayer.php?team_id=${teamId}`;
    const playerBody = JSON.stringify(player);
    return this.http.post(createPlayerUrl, playerBody, this.httpOptions);
  }

  getPlayer(playerId: number) {
    const getPlayerUrl = `http://localhost/CloudMatch-BACKEND/php/players_controller/getPlayer.php?player_id=${playerId}`;
    return this.http.get(getPlayerUrl, this.httpOptions);
  }

}
