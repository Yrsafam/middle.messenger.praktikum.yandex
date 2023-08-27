export class ParseForm {
  private form: HTMLFormElement;

  constructor(form: HTMLElement) {
    this.form = form as HTMLFormElement;
  }

  public getValues() {
    const formData = new FormData(this.form);

    return formData.entries();
  }

  public printValues() {
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of this.getValues()) {
      // eslint-disable-next-line no-console
      console.log("Form data:", `${key}: ${value}`);
    }
  }
}
