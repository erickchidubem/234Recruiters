import { AbstractControl, ValidationErrors } from "@angular/forms";

export const PasswordStrengthValidator = function (
  control: AbstractControl
): ValidationErrors | null {
  let value: string = control.value || "";

  if (!value) {
    return null;
  }

  if (value.length < 8) {
    return {
      passwordStrength: `Password must be at least eight characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character`,
    };
  }

  let upperCaseCharacters = /[A-Z]+/g;
  if (upperCaseCharacters.test(value) === false) {
    return {
      passwordStrength: `Password must be at least eight characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character`,
    };
  }

  let lowerCaseCharacters = /[a-z]+/g;
  if (lowerCaseCharacters.test(value) === false) {
    return {
      passwordStrength: `Password must be at least eight characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character`,
    };
  }

  let numberCharacters = /[0-9]+/g;
  if (numberCharacters.test(value) === false) {
    return {
      passwordStrength: `Password must be at least eight characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character`,
    };
  }

  let specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  if (specialCharacters.test(value) === false) {
    return {
      passwordStrength: `Password must be at least eight characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character`,
    };
  }
  return null;
};
