import { Component, signal } from '@angular/core';
import {
  form,
  required,
  email,
  minLength,
  validate,
  submit,
  FormField,
  pattern,
} from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { ButtonModule } from '@openng/optimus-ui/button';
import { CheckboxModule } from '@openng/optimus-ui/checkbox';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { PasswordModule } from '@openng/optimus-ui/password';

interface RegisterModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

@Component({
  selector: 'app-register',
  imports: [
    RouterLink,
    FormField,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  readonly registerModel = signal<RegisterModel>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
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
      const data = this.registerModel();

      console.log('Registration:', data);

      // TODO:
      // await this.authService.register(data);

      return undefined;
    });

    if (success) {
      console.log('Registration successful');
    }
  }
}
