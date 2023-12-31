import { Block } from "../../utils/Block.ts";
import template from "./template.hbs";
import { Validator, ValidatorRules } from "../../utils/Validator.ts";
import {
  handleBlurField,
  handleChangeField,
  handleValidateForm,
} from "../../utils/handlersForm.ts";
import { ParseForm } from "../../utils/ParseForm.ts";
import { PropsForm, User } from "../../shared-kernel/types.ts";
import { withStore } from "../../utils/Store.ts";
import { userController } from "../../controllers/UserController.ts";

interface Props extends Omit<PropsForm, "values"> {
  values: Omit<User, "avatar" | "id">;
  avatar: string;
  onChangeAvatar(event: Event): void;
}

class ProfileEditBlock extends Block<Props> {
  static componentName = "ProfileEdit";

  private validator: Validator;

  private rulesValidation = [
    ValidatorRules.Email,
    ValidatorRules.Login,
    ValidatorRules.FirstName,
    ValidatorRules.SecondName,
    ValidatorRules.Phone,
    ValidatorRules.DisplayName,
  ];

  constructor() {
    super({
      values: {
        [ValidatorRules.Email]: "",
        [ValidatorRules.Login]: "",
        [ValidatorRules.FirstName]: "",
        [ValidatorRules.SecondName]: "",
        [ValidatorRules.Phone]: "",
        [ValidatorRules.DisplayName]: "",
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
        [ValidatorRules.DisplayName]: (event: Event) => {
          this.onChangeDisplayName(event);
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
        [ValidatorRules.DisplayName]: (event: Event) => {
          this.onBlurDisplayName(event);
        },
      },
      errorsValidation: {
        [ValidatorRules.Email]: "",
        [ValidatorRules.Login]: "",
        [ValidatorRules.FirstName]: "",
        [ValidatorRules.SecondName]: "",
        [ValidatorRules.Phone]: "",
        [ValidatorRules.DisplayName]: "",
      },
      onClick: (event) => {
        this.onSubmit(event);
      },
      avatar: "",
      onChangeAvatar: (event) => this.onChangeAvatar(event),
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

  private onBlurDisplayName(event: Event) {
    this.onBlur(event, ValidatorRules.DisplayName);
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

  private onChangeDisplayName(event: Event) {
    this.onChange(event, ValidatorRules.DisplayName);
  }

  private async onChangeAvatar(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files!;
    const formData = new FormData();
    const file = files[0];

    formData.append("avatar", file);

    await userController.updateAvatar(formData);
  }

  private async onSubmit(event: Event) {
    event.preventDefault();
    this.validator = new Validator(this.refs.form.element!);

    const isValid = this.validateForm();

    if (isValid) {
      const parseForm = new ParseForm(this.refs.form.element!);

      await userController.updateProfile(
        parseForm.getData() as Omit<User, "id" | "avatar">,
      );
    }
  }

  protected render() {
    return this.compile(template, this.props);
  }
}

const withValues = withStore((state) => ({
  values: {
    first_name: state.user.first_name,
    second_name: state.user.second_name,
    display_name: state.user.display_name,
    phone: state.user.phone,
    login: state.user.login,
    email: state.user.email,
  },
  avatar: state.user.avatar,
}));

export const ProfileEdit = withValues(ProfileEditBlock);
