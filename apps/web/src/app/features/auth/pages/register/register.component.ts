import { Component, inject, signal } from '@angular/core';
import { form, required, email, minLength, validate, submit, FormField, pattern } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from '@openng/optimus-ui/button';
import { CheckboxModule } from '@openng/optimus-ui/checkbox';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { PasswordModule } from '@openng/optimus-ui/password';
import { AuthService } from '../../services/auth.service';
import { DEFAULT_USER_ROLE, IUserRegister } from '@build-track/types';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

interface RegisterModel extends IUserRegister {
  confirmPassword: string;
  acceptTerms: boolean;
}

@Component({
  selector: 'app-register',
  imports: [RouterLink, FormField, ButtonModule, InputTextModule, PasswordModule, CheckboxModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public readonly errorMessage = signal<string | null>(null);

  private readonly authService: AuthService = inject(AuthService);
  private readonly router = inject(Router);

  // readonly registerModel = signal<RegisterModel>({
  readonly registerModel = signal<RegisterModel>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    address: '',
  });

  readonly registerForm = form(this.registerModel, (schema) => {
    (this.registerModel,
      required(schema.firstName, {
        message: "Введіть ім'я",
      }));

    required(schema.lastName, {
      message: 'Введіть прізвище',
    });

    required(schema.email, {
      message: 'Введіть email',
    });

    email(schema.email, {
      message: 'Введіть коректний email',
    });

    required(schema.password, {
      message: 'Введіть пароль',
    });

    required(schema.address, {
      message: 'Введіть адресу',
    });

    minLength(schema.password, 6, {
      message: 'Пароль повинен містити щонайменше 6 символів',
    });

    pattern(schema.password, /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
      message: 'Пароль повинен містити хоча б одну букву та одну цифру',
    });

    required(schema.confirmPassword, {
      message: 'Підтвердіть пароль',
    });

    validate(schema.confirmPassword, ({ value, valueOf }) => {
      if (!value()) {
        return null;
      }

      if (value() !== valueOf(schema.password)) {
        return {
          kind: 'passwordMismatch',
          message: 'Паролі не співпадають',
        };
      }

      return null;
    });

    validate(schema.acceptTerms, ({ value }) => {
      if (!value()) {
        return {
          kind: 'termsNotAccepted',
          message: 'Необхідно погодитися з умовами',
        };
      }

      return null;
    });
  });

  async onSubmit(): Promise<void> {
    const success = await submit(this.registerForm, async () => {
      const { confirmPassword, acceptTerms, ...data } = this.registerModel();
      this.errorMessage.set('');

      try {
        await firstValueFrom(this.authService.register({ ...data, role: DEFAULT_USER_ROLE }));
        return undefined;
      } catch (error) {
        if (error instanceof HttpErrorResponse && error.status === 409) {
          this.errorMessage.set(`Користувач з таким email вже існує - ${error.error?.message ?? 'невідома помилка'}`);
        } else {
          this.errorMessage.set(
            `Не вдалося створити акаунт. Спробуйте ще раз - ${error instanceof Error ? error.message : ((error as any)?.error.message ?? 'невідома помилка')}`,
          );
        }

        return undefined;
      }
    });

    if (success && !this.errorMessage()) {
      await this.router.navigate(['/app']);
      console.log('Registration successful, navigate to /app');
    }
  }
}
