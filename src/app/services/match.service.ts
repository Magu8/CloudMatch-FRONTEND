import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatchDate } from '../models/match.date';
import { Match } from '../models/match';
import { MatchScores } from '../models/match.scores';
@Injectable({ providedIn: 'root' })
export class MatchService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  createMatch(
    match: MatchDate,
    leagueId: number,
    localId: number,
    visitorId: number,
    refereeId: number
  ) {
    const createMatchUrl = `http://localhost/CloudMatch-BACKEND/php/match_controller/createMatch.php?league_id=${leagueId}&referee_id=${refereeId}&local_id=${localId}&visitor_id=${visitorId}`;
    const matchDateBody = JSON.stringify(match);
    return this.http.post(createMatchUrl, matchDateBody, this.httpOptions);
  }

  matchCalendar(leagueId: number) {
    const matchCalendarUrl = `http://localhost/CloudMatch-BACKEND/php/match_controller/matchCalendar.php?league_id=${leagueId}`;
    return this.http.get(matchCalendarUrl, this.httpOptions);
  }

  getMatchDay(matchDate: string, leagueId: number) {
    const getMatchDayUrl = `http://localhost/CloudMatch-BACKEND/php/match_controller/getDayMatch.php?league=${leagueId}&match_date=${matchDate}`;
    return this.http.get(getMatchDayUrl, this.httpOptions);
  }

  setMatchOnLive(matchBody: Match) {
    const setMatchOnLiveUrl =
      'http://localhost/CloudMatch-BACKEND/php/redis/match/setMatchOnLive.php';
    const matchDateBody = JSON.stringify(matchBody);
    return this.http.post(setMatchOnLiveUrl, matchDateBody, this.httpOptions);
  }

  getMatchOnLive() {
    const getMatchOnLive =
      'http://localhost/CloudMatch-BACKEND/php/redis/match/getMatchOnLive.php';
    return this.http.get(getMatchOnLive, this.httpOptions);
  }

  saveMatch(matchBody: MatchScores) {
    const saveMatchUrl =
      'http://localhost/CloudMatch-BACKEND/php/redis/match/saveMatch.php';
    const matchScoreBody = JSON.stringify(matchBody);
    return this.http.put(saveMatchUrl, matchScoreBody, this.httpOptions);
  }

  resetMatch() {
    const resetMatchUrl =
      'http://localhost/CloudMatch-BACKEND/php/redis/match/resetMatch.php';
    return this.http.put(resetMatchUrl, this.httpOptions);
  }
  
}
