import { Block } from "../../utils/Block.ts";
import template from "./template.hbs";
import { Validator, ValidatorRules } from "../../utils/Validator.ts";
import { ParseForm } from "../../utils/ParseForm.ts";

interface Props {
  errorsValidation: Record<string, string>;
  onClick(event: Event): void;
  values: Record<string, string>;
  handlersChange: Record<string, (event: Event) => void>;
  handlersBlur: Record<string, (event: Event) => void>;
}

export class ChangePassword extends Block<Props> {
  static componentName = "ChangePassword";

  private validator: Validator;

  constructor() {
    super({
      values: {
        [ValidatorRules.Password]: "",
        [ValidatorRules.NewPassword]: "",
        [ValidatorRules.RepeatPassword]: "",
      },
      handlersChange: {
        [ValidatorRules.Password]: (event: Event) => {
          this.onChangePassword(event);
        },
        [ValidatorRules.NewPassword]: (event: Event) => {
          this.onChangeNewPassword(event);
        },
        [ValidatorRules.RepeatPassword]: (event: Event) => {
          this.onChangeRepeatPassword(event);
        },
      },
      handlersBlur: {
        [ValidatorRules.Password]: (event: Event) => {
          this.onBlurPassword(event);
        },
        [ValidatorRules.NewPassword]: (event: Event) => {
          this.onBlurNewPassword(event);
        },
        [ValidatorRules.RepeatPassword]: (event: Event) => {
          this.onBlurRepeatPassword(event);
        },
      },
      errorsValidation: {
        [ValidatorRules.Password]: "",
        [ValidatorRules.NewPassword]: "",
        [ValidatorRules.RepeatPassword]: "",
      },
      onClick: (event) => {
        this.onSubmit(event);
      },
    });

    this.validator = new Validator(this.refs.form.element!);
    this.onSubmit = this.onSubmit.bind(this);
  }

  private validateForm() {
    const resultValidation = this.validator.checkForm();
    this.refs[ValidatorRules.Password].setProps({
      ...this.refs[ValidatorRules.Password].props,
      errorText: resultValidation.errors[ValidatorRules.Password],
    });
    this.refs[ValidatorRules.NewPassword].setProps({
      ...this.refs[ValidatorRules.NewPassword].props,
      errorText: resultValidation.errors[ValidatorRules.NewPassword],
    });
    this.refs[ValidatorRules.RepeatPassword].setProps({
      ...this.refs[ValidatorRules.RepeatPassword].props,
      errorText: resultValidation.errors[ValidatorRules.RepeatPassword],
    });

    return resultValidation.result;
  }

  private onChange(event: Event, field: string) {
    const target = event.target as HTMLInputElement;
    event.preventDefault();

    this.refs[field].setProps({
      ...this.refs[field].props,
      value: target.value,
    });
  }

  private onBlur(event: Event, field: string) {
    event.preventDefault();

    const resultValidation = this.validator.checkField(field);

    this.refs[field].setProps({
      ...this.refs[field].props,
      errorText: resultValidation.error,
    });
  }

  private onBlurPassword(event: Event) {
    this.onBlur(event, ValidatorRules.Password);
  }

  private onBlurNewPassword(event: Event) {
    this.onBlur(event, ValidatorRules.NewPassword);
  }

  private onBlurRepeatPassword(event: Event) {
    this.onBlur(event, ValidatorRules.RepeatPassword);
  }

  private onChangePassword(event: Event) {
    this.onChange(event, ValidatorRules.Password);
  }

  private onChangeNewPassword(event: Event) {
    this.onChange(event, ValidatorRules.NewPassword);
  }

  private onChangeRepeatPassword(event: Event) {
    this.onChange(event, ValidatorRules.RepeatPassword);
  }

  private onSubmit(event: Event) {
    event.preventDefault();
    const isValid = this.validateForm();

    if (isValid) {
      const parseForm = new ParseForm(this.refs.form.element!);
      parseForm.printValues();
    }
  }

  protected render() {
    return this.compile(template, this.props);
  }
}
