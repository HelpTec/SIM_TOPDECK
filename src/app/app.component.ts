import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FrontComponent } from './component/front/front.component';
import { MTGComponent } from './mtg/mtg.component';
import { HSComponent } from './component/hs/hs.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FrontComponent, MTGComponent, HSComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Sim_Topdeck';
}
