export interface PropsForm {
  errorsValidation: Record<string, string>;
  onClick(event: Event): void;
  values: Record<string, string>;
  handlersChange: Record<string, (event: Event) => void>;
  handlersBlur: Record<string, (event: Event) => void>;
}
