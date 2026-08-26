import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Service()
export class Test {
  private apiUrl = 'http://localhost:3000/api';
  private userEndpoint = '/user';

  private api = inject(HttpClient);

  getUsers() {
    const users = this.api.get(`${this.apiUrl}${this.userEndpoint}`);
    return users;

    // const response: Response = await fetch(`${this.apiUrl}${this.userEndpoint}`);
    // if (!response.ok) {
    //     throw new Error('Failed to fetch users');
    // }

    // console.log('Response:', response);
    // return await response.json();
  }
}
