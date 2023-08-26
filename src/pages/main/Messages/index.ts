import { Block } from "../../../utils/Block.ts";
import { messages } from "../../../utils/mocks.ts";
import template from "./template.hbs";
import { handleChangeField } from "../../../utils/handlersForm.ts";
import { Validator, ValidatorRules } from "../../../utils/Validator.ts";

interface Props {
  value: string;
  onChange(event: Event): void;
  disabledSubmit: boolean;
  messages: typeof messages;
}

export class Messages extends Block<Props> {
  static componentName = "Messages";

  private validator: Validator;

  constructor(props: Props) {
    super({
      ...props,
      messages,
      disabledSubmit: true,
      value: "",
      onChange: (event) => {
        this.onChange(event, ValidatorRules.Message);
      },
    });

    this.validator = new Validator(this.refs.form.element!);
  }

  private onChange(event: Event, field: string) {
    handleChangeField(event, field, this.refs);

    const resultValidation = this.validator.checkField(field);

    this.refs.submit.setProps({
      ...this.refs.submit.props,
      disabled: !resultValidation.result,
    });
  }

  protected render() {
    return this.compile(template, this.props);
  }
}
