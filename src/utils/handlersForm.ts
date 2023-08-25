import { Validator, ValidatorRules } from "./Validator.ts";
import { BlockRefs } from "./Block.ts";

export function handleValidateForm(
  validator: Validator,
  refs: BlockRefs,
  rules: ValidatorRules[],
) {
  const resultValidation = validator.checkForm();

  rules.forEach((rule) => {
    refs[rule].setProps({
      ...refs[rule].props,
      errorText: resultValidation.errors[rule],
    });
  });

  return resultValidation.result;
}

export function handleChangeField(
  event: Event,
  field: string,
  refs: BlockRefs,
) {
  const target = event.target as HTMLInputElement;
  event.preventDefault();

  refs[field].setProps({
    ...refs[field].props,
    value: target.value,
  });
}

// eslint-disable-next-line max-params
export function handleBlurField(
  event: Event,
  field: string,
  validator: Validator,
  refs: BlockRefs,
) {
  event.preventDefault();

  const resultValidation = validator.checkField(field);

  refs[field].setProps({
    ...refs[field].props,
    errorText: resultValidation.error,
  });
}
