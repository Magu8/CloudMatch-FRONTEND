import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { Register } from '../../../../models/register';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'cloudMatch-register',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {


  alert?: string = '';
  error?: string = '';

  register: Register = {
    name: '',
    surname: '',
    email: '',
    password: '',
  };
  constructor(private userService: UserService) {}

  registerUser(registerBody: Register) {
    this.userService
      .register(registerBody)
      .subscribe({
        next: () => {
          this.error = '';
          this.alert = 'Account successfully created!';
        }, 
        error: (error) => {
          this.alert = '';
          if (error.status === 409) {
            this.error = 'This email is already in use';
          } else {
            this.error = 'Must fill all the fields'
          }
        }
      });
  }
}
