export class AppForm {
  constructor(elem) {
    this.elem = elem;
    this.btn = this.elem.querySelector(".form__submit");
    this.inputsRequired = [...this.elem.querySelectorAll("input:required")];
    this.inputsInvalid = [];
    this.isValid = false;
    this._init();
  }
  _init() {
    this._formValidate();
    this._addEventOnInput();
  }
  _getInputsInvalid() {
    this.inputsInvalid = [...this.elem.querySelectorAll("input:invalid")];
  }
  _toggleDisabledBtn() {
    this.btn.disabled = !this.isValid;
  }
  _toggleIsValid() {
    this.isValid = !this.inputsInvalid.length;
  }
  _formValidate() {
    this._getInputsInvalid();
    this._toggleIsValid();
    this._toggleDisabledBtn();
  }
  _addEventOnInput() {
    for (const input of this.inputsRequired) {
      input.addEventListener("input", () => {
        this._formValidate();

        if (!input.validity.valid === true) {
          input.classList.add("error");
        } else {
          input.classList.remove("error");
        }
      });
    }
  }
}
