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
    const result: Record<string, string> = {};
    const controls = this.form.querySelectorAll<HTMLInputElement>("[name]");

    controls.forEach((control) => {
      const errorMessage = this.check(control);

      const [first] = errorMessage;
      result[control.name] = first ?? "";
    });

    return result;
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
}
