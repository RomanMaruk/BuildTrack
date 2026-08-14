import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Test } from './services/test';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'web';

  private test  = inject(Test);

  ngOnInit() { 
  }
}
