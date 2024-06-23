import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FrontComponent } from './component/front/front.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FrontComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Sim_Topdeck';
}
