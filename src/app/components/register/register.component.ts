import { Component } from '@angular/core';
import { Register } from '../../models/register';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'cloudMatch-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
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
      .subscribe((res) => console.log(res));
  }
}
