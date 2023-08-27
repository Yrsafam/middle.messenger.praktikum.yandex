import { Block } from "../../utils/Block.ts";
import template from "./template.hbs";
import { Validator, ValidatorRules } from "../../utils/Validator.ts";
import { PropsForm } from "../../shared-kernel/types.ts";
import {
  handleBlurField,
  handleChangeField,
  handleValidateForm,
} from "../../utils/handlersForm.ts";
import { ParseForm } from "../../utils/ParseForm.ts";

interface Props extends PropsForm {}

export class Authorization extends Block<Props> {
  static componentName = "Authorization";

  private rulesValidation = [ValidatorRules.Login, ValidatorRules.Password];

  private validator: Validator;

  constructor() {
    super({
      values: {
        [ValidatorRules.Password]: "",
        [ValidatorRules.Login]: "",
      },
      handlersChange: {
        [ValidatorRules.Password]: (event: Event) => {
          this.onChangePassword(event);
        },
        [ValidatorRules.Login]: (event: Event) => {
          this.onChangeLogin(event);
        },
      },
      handlersBlur: {
        [ValidatorRules.Password]: (event: Event) => {
          this.onBlurPassword(event);
        },
        [ValidatorRules.Login]: (event: Event) => {
          this.onBlurLogin(event);
        },
      },
      errorsValidation: {
        [ValidatorRules.Password]: "",
        [ValidatorRules.Login]: "",
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

  private onBlurPassword(event: Event) {
    this.onBlur(event, ValidatorRules.Password);
  }

  private onBlurLogin(event: Event) {
    this.onBlur(event, ValidatorRules.Login);
  }

  private onChangePassword(event: Event) {
    this.onChange(event, ValidatorRules.Password);
  }

  private onChangeLogin(event: Event) {
    this.onChange(event, ValidatorRules.Login);
  }

  private onSubmit(event: Event) {
    event.preventDefault();
    const isValid = this.validateForm();

    if (isValid) {
      const parseForm = new ParseForm(this.refs.form.element!);
      parseForm.printValues();
      window.location.assign("/");
    }
  }

  protected render() {
    return this.compile(template, this.props);
  }
}
