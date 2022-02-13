// * значит что импортируются все функции, которые там есть
import * as flsFunctions from "./modules/functions.js";
import { AppForm } from "./modules/form.js";

flsFunctions.isWebp();

const forms = document.querySelectorAll(".form");
if (forms.length) {
  for (const form of forms) {
    new AppForm(form);
  }
}
