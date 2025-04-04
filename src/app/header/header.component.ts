import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public title = 'Relocation';
  public imagePath = './../assets/images/relocation.jpg';
}
