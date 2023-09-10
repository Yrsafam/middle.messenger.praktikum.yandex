import { Block } from "../../../utils/Block.ts";
import template from "./template.hbs";
import { handleChangeField } from "../../../utils/handlersForm.ts";
import { Validator, ValidatorRules } from "../../../utils/Validator.ts";
import { MessageView } from "../../../utils/services.ts";

interface Props {
  value: string;
  onChange(event: Event): void;
  disabledSubmit: boolean;
  messages: MessageView[];
  selectedChatId: number | undefined;
}

export class Messages extends Block<Props> {
  static componentName = "Messages";

  constructor(props: Props) {
    super({
      ...props,
      disabledSubmit: true,
      value: "",
      onChange: (event) => {
        this.onChange(event, ValidatorRules.Message);
      },
    });
  }

  private onChange(event: Event, field: string) {
    if (this.props.selectedChatId) {
      handleChangeField(event, field, this.refs);

      const validator = new Validator(this.refs.form.element!);

      const resultValidation = validator.checkField(field);

      this.refs.submit.setProps({
        ...this.refs.submit.props,
        disabled: !resultValidation.result,
      });
    }
  }

  protected render() {
    return this.compile(template, this.props);
  }
}
