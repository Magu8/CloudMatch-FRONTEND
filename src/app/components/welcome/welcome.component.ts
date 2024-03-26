import { Component } from '@angular/core';
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from './components/register/register.component';

@Component({
    selector: 'app-welcome',
    standalone: true,
    templateUrl: './welcome.component.html',
    styleUrl: './welcome.component.scss',
    imports: [LoginComponent, RegisterComponent]
})
export class WelcomeComponent {

}
