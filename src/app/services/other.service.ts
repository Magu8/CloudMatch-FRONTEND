import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OtherService {
  getActualDay() {
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  getActualTime(){
    const time = new Date();
    const hour = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    return `${hour}:${minutes}:${seconds}`
  }

  floatTime(time: string) {
    const [hour, minutes] = time.split(':').map(Number);
    if (minutes < 30) {
      return `${hour}:00`;
  } else {
      const newTime = (hour + 1) % 24;
      return `${newTime}:00`;
  }
  }

}
