import { Block } from "../../utils/Block.ts";
import template from "./template.hbs";
import { PropsForm } from "../../shared-kernel/types.ts";
import { Validator, ValidatorRules } from "../../utils/Validator.ts";
import {
  handleBlurField,
  handleChangeField,
  handleValidateForm,
} from "../../utils/handlersForm.ts";
import { ParseForm } from "../../utils/ParseForm.ts";
import { authController } from "../../controllers/AuthController.ts";
import { SignupData } from "../../api/AuthAPI.ts";

interface Props extends PropsForm {}

export class Registration extends Block<Props> {
  static componentName = "Registration";

  private validator: Validator;

  private rulesValidation = [
    ValidatorRules.Email,
    ValidatorRules.Login,
    ValidatorRules.FirstName,
    ValidatorRules.SecondName,
    ValidatorRules.Phone,
    ValidatorRules.Password,
    ValidatorRules.RepeatPassword,
  ];

  constructor() {
    super({
      values: {
        [ValidatorRules.Email]: "",
        [ValidatorRules.Login]: "",
        [ValidatorRules.FirstName]: "",
        [ValidatorRules.SecondName]: "",
        [ValidatorRules.Phone]: "",
        [ValidatorRules.Password]: "",
        [ValidatorRules.RepeatPassword]: "",
      },
      handlersChange: {
        [ValidatorRules.Email]: (event: Event) => {
          this.onChangeEmail(event);
        },
        [ValidatorRules.Login]: (event: Event) => {
          this.onChangeLogin(event);
        },
        [ValidatorRules.FirstName]: (event: Event) => {
          this.onChangeFirstName(event);
        },
        [ValidatorRules.SecondName]: (event: Event) => {
          this.onChangeSecondName(event);
        },
        [ValidatorRules.Phone]: (event: Event) => {
          this.onChangePhone(event);
        },
        [ValidatorRules.Password]: (event: Event) => {
          this.onChangePassword(event);
        },
        [ValidatorRules.RepeatPassword]: (event: Event) => {
          this.onChangeRepeatPassword(event);
        },
      },
      handlersBlur: {
        [ValidatorRules.Email]: (event: Event) => {
          this.onBlurEmail(event);
        },
        [ValidatorRules.Login]: (event: Event) => {
          this.onBlurLogin(event);
        },
        [ValidatorRules.FirstName]: (event: Event) => {
          this.onBlurFirstName(event);
        },
        [ValidatorRules.SecondName]: (event: Event) => {
          this.onBlurSecondName(event);
        },
        [ValidatorRules.Phone]: (event: Event) => {
          this.onBlurPhone(event);
        },
        [ValidatorRules.Password]: (event: Event) => {
          this.onBlurPassword(event);
        },
        [ValidatorRules.RepeatPassword]: (event: Event) => {
          this.onBlurRepeatPassword(event);
        },
      },
      errorsValidation: {
        [ValidatorRules.Email]: "",
        [ValidatorRules.Login]: "",
        [ValidatorRules.FirstName]: "",
        [ValidatorRules.SecondName]: "",
        [ValidatorRules.Phone]: "",
        [ValidatorRules.Password]: "",
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
    return handleValidateForm(this.validator, this.refs, this.rulesValidation);
  }

  private onChange(event: Event, field: string) {
    handleChangeField(event, field, this.refs);
  }

  private onBlur(event: Event, field: string) {
    handleBlurField(event, field, this.validator, this.refs);
  }

  private onBlurEmail(event: Event) {
    this.onBlur(event, ValidatorRules.Email);
  }

  private onBlurLogin(event: Event) {
    this.onBlur(event, ValidatorRules.Login);
  }

  private onBlurFirstName(event: Event) {
    this.onBlur(event, ValidatorRules.FirstName);
  }

  private onBlurSecondName(event: Event) {
    this.onBlur(event, ValidatorRules.SecondName);
  }

  private onBlurPhone(event: Event) {
    this.onBlur(event, ValidatorRules.Phone);
  }

  private onBlurPassword(event: Event) {
    this.onBlur(event, ValidatorRules.Password);
  }

  private onBlurRepeatPassword(event: Event) {
    this.onBlur(event, ValidatorRules.RepeatPassword);
  }

  private onChangeEmail(event: Event) {
    this.onChange(event, ValidatorRules.Email);
  }

  private onChangeLogin(event: Event) {
    this.onChange(event, ValidatorRules.Login);
  }

  private onChangeFirstName(event: Event) {
    this.onChange(event, ValidatorRules.FirstName);
  }

  private onChangeSecondName(event: Event) {
    this.onChange(event, ValidatorRules.SecondName);
  }

  private onChangePhone(event: Event) {
    this.onChange(event, ValidatorRules.Phone);
  }

  private onChangePassword(event: Event) {
    this.onChange(event, ValidatorRules.Password);
  }

  private onChangeRepeatPassword(event: Event) {
    this.onChange(event, ValidatorRules.RepeatPassword);
  }

  private onSubmit(event: Event) {
    event.preventDefault();
    const isValid = this.validateForm();

    if (isValid) {
      const parseForm = new ParseForm(this.refs.form.element!);

      authController.signup(parseForm.getData() as SignupData);
    }
  }

  protected render() {
    return this.compile(template, this.props);
  }
}
