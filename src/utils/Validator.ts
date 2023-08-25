export enum ValidatorRules {
  FirstName = "first_name",
  SecondName = "second_name ",
  Login = "login",
  Email = "email",
  Password = "password",
  NewPassword = "new_password",
  RepeatPassword = "repeat_password",
  Phone = "phone",
  Message = "message",
}

type ValidatorValidateResult = {
  result: boolean;
  message: string;
};

export class Validator {
  private form: HTMLElement;

  constructor(form: HTMLElement) {
    this.form = form;
  }

  public checkForm() {
    let result = false;
    const errors: Record<string, string> = {};
    const controls = this.form.querySelectorAll<HTMLInputElement>("[name]");

    controls.forEach((control) => {
      const errorMessage = this.check(control);

      const [first] = errorMessage;
      errors[control.name] = first ?? "";
    });

    result = Object.values(errors).every((value) => value.length === 0);

    return { result, errors };
  }

  public checkField(name: string) {
    let error: string = "";
    let result = false;
    const control = this.form.querySelector<HTMLInputElement>(
      `input[name='${name}']`,
    );

    if (control) {
      const errorMessage = this.check(control);

      const [first] = errorMessage;

      error = first ?? "";
      result = error.length === 0;
    }

    return { result, error };
  }

  private check(input: HTMLInputElement) {
    let errors: string[] = [];

    switch (input.name) {
      case ValidatorRules.Email: {
        const { result, message } = this.validateEmail(input.value);

        if (!result) {
          errors.push(message);
        }
        break;
      }
      case ValidatorRules.NewPassword:
      case ValidatorRules.RepeatPassword:
      case ValidatorRules.Password: {
        const { result, message } = this.validatePassword(input.value);

        if (!result) {
          errors.push(message);
        }
        break;
      }
      case ValidatorRules.FirstName:
      case ValidatorRules.SecondName: {
        const { result, message } = this.validateName(input.value);

        if (!result) {
          errors.push(message);
        }
        break;
      }
      default:
        errors = [];
        break;
    }

    return errors;
  }

  private validate(
    value: string,
    regexp: RegExp,
    message: string,
  ): ValidatorValidateResult {
    let result: ValidatorValidateResult = {
      result: true,
      message: "",
    };

    if (!regexp.test(value)) {
      result = {
        result: false,
        message,
      };
    }

    return result;
  }

  private validateEmail(value: string): ValidatorValidateResult {
    const regexp = /^\S+@\S+\.\S+$/;
    const ERROR_MESSAGE: string = "Неверный email";
    return this.validate(value, regexp, ERROR_MESSAGE);
  }

  private validatePassword(value: string): ValidatorValidateResult {
    const regexp = /^(?=.*[A-Z])(?=.*\d)[\d\D]{8,40}$/;
    const ERROR_MESSAGE: string =
      "Пароль от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.";

    return this.validate(value, regexp, ERROR_MESSAGE);
  }

  private validateName(value: string): ValidatorValidateResult {
    const regexp = /^(?=[A-ZА-Я])[A-Za-zА-Яа-я-]*$/;
    const ERROR_MESSAGE: string = "Допустимы только буквы, цифры и дефис";

    return this.validate(value, regexp, ERROR_MESSAGE);
  }
}
