export interface PropsForm {
  errorsValidation: Record<string, string>;
  onClick(event: Event): void;
  values: Record<string, string>;
  handlersChange: Record<string, (event: Event) => void>;
  handlersBlur: Record<string, (event: Event) => void>;
}

export type User = {
  id: number;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
  display_name: string;
};
