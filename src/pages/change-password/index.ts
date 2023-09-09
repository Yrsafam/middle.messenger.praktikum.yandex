import { Block } from "../../utils/Block.ts";
import template from "./template.hbs";
import { Validator, ValidatorRules } from "../../utils/Validator.ts";
import { ParseForm } from "../../utils/ParseForm.ts";
import {
  handleBlurField,
  handleChangeField,
  handleValidateForm,
} from "../../utils/handlersForm.ts";
import { UserPassword } from "../../api/UserAPI.ts";
import { userController } from "../../controllers/UserController.ts";
import { withStore } from "../../utils/Store.ts";

interface Props {
  errorsValidation: Record<string, string>;
  onClick(event: Event): void;
  values: Record<string, string>;
  handlersChange: Record<string, (event: Event) => void>;
  handlersBlur: Record<string, (event: Event) => void>;
  avatar: string;
}

export class ChangePasswordBlock extends Block<Props> {
  static componentName = "ChangePassword";

  private validator: Validator;

  private rulesValidation = [
    ValidatorRules.Password,
    ValidatorRules.NewPassword,
  ];

  constructor() {
    super({
      values: {
        [ValidatorRules.Password]: "",
        [ValidatorRules.NewPassword]: "",
      },
      handlersChange: {
        [ValidatorRules.Password]: (event: Event) => {
          this.onChangePassword(event);
        },
        [ValidatorRules.NewPassword]: (event: Event) => {
          this.onChangeNewPassword(event);
        },
      },
      handlersBlur: {
        [ValidatorRules.Password]: (event: Event) => {
          this.onBlurPassword(event);
        },
        [ValidatorRules.NewPassword]: (event: Event) => {
          this.onBlurNewPassword(event);
        },
      },
      errorsValidation: {
        [ValidatorRules.Password]: "",
        [ValidatorRules.NewPassword]: "",
      },
      onClick: (event) => {
        this.onSubmit(event);
      },
      avatar: "",
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

  private onBlurNewPassword(event: Event) {
    this.onBlur(event, ValidatorRules.NewPassword);
  }

  private onChangePassword(event: Event) {
    this.onChange(event, ValidatorRules.Password);
  }

  private onChangeNewPassword(event: Event) {
    this.onChange(event, ValidatorRules.NewPassword);
  }

  private async onSubmit(event: Event) {
    event.preventDefault();
    const isValid = this.validateForm();

    if (isValid) {
      const parseForm = new ParseForm(this.refs.form.element!);
      const dataForm = parseForm.getData();
      const data: UserPassword = {
        newPassword: dataForm.new_password as string,
        oldPassword: dataForm.password as string,
      };

      await userController.changePassword(data);
    }
  }

  protected render() {
    return this.compile(template, this.props);
  }
}

const withAvatar = withStore((state) => ({ avatar: state.user.avatar }));

export const ChangePassword = withAvatar(ChangePasswordBlock);
