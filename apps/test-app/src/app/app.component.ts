import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs';

@Component({
  selector: 'logger-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'test-app';

  constructor(private http: HttpClient) {

  }


  mockHttpRequest() {
    this.http.get('/qlskfjqslk').subscribe()
  }

  mockException() {
    throw new Error('test error');
  }
}
