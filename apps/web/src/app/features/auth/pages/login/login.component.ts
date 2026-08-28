import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { email, form, FormField, required, submit, minLength, pattern } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../services/auth.service';

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
  readonly errorMessage = signal('');

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
    // pattern(schema.password, /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
    //   message: 'Пароль повинен містити хоча б одну букву та одну цифру',
    // });
  });

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  async onSubmit(): Promise<void> {
    const success = await submit(this.loginForm, async () => {
      const credentials = this.loginModel();
      this.errorMessage.set('');

      try {
        await firstValueFrom(this.authService.login(credentials));
        await this.router.navigate(['/app']);
        return undefined;
      } catch (error) {
        this.errorMessage.set('Невірний email або пароль');
        return undefined;
      }
    });

    if (success) {
      this.errorMessage.set('');
    }
  }
}
