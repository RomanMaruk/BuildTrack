import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { email, form, FormField, required, submit, minLength, pattern } from '@angular/forms/signals';

import { ButtonModule } from '@openng/optimus-ui/button';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { PasswordModule } from '@openng/optimus-ui/password';
import { CheckboxModule } from '@openng/optimus-ui/checkbox';

interface LoginModel {
  email: string;
  password: string;
  rememberMe: boolean;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormField, ButtonModule, InputTextModule, PasswordModule, CheckboxModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  readonly loginModel = signal<LoginModel>({
    email: '',
    password: '',
    rememberMe: false,
  });

  readonly loginForm = form(this.loginModel, (schema) => {
    required(schema.email, {
      message: 'Введіть email',
    });

    email(schema.email, {
      message: 'Введіть коректний email',
    });

    required(schema.password, {
      message: 'Введіть пароль',
    });
    minLength(schema.password, 6, {
      message: 'Пароль повинен містити щонайменше 6 символів',
    });
    pattern(schema.password, /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
      message: 'Пароль повинен містити хоча б одну букву та одну цифру',
    });
  });

  async onSubmit(): Promise<void> {
    const success = await submit(this.loginForm, async () => {
      const credentials = this.loginModel();

      console.log('Login:', credentials);

      // TODO:
      // await this.authService.login(credentials);

      return undefined;
    });

    if (success) {
      console.log('Login successful');
    }
  }
}
