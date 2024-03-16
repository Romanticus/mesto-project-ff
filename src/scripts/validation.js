
const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  popupSelectors
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(popupSelectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(popupSelectors.errorClass);
};

const hideInputError = (formElement, inputElement, popupSelectors) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(popupSelectors.inputErrorClass);
  errorElement.classList.remove(popupSelectors.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, popupSelectors) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      popupSelectors
    );
  } else {
    hideInputError(formElement, inputElement, popupSelectors);
  }
};

const setEventListeners = (formElement, popupSelectors) => {
  const inputList = Array.from(
    formElement.querySelectorAll(popupSelectors.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    popupSelectors.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, popupSelectors);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, popupSelectors);
      toggleButtonState(inputList, buttonElement, popupSelectors);

    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function toggleButtonState(inputList, buttonElement, popupSelectors) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(popupSelectors.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(popupSelectors.inactiveButtonClass);
  }
}

export const enableValidation = (popupSelectors) => {
  const formList = Array.from(
    document.querySelectorAll(popupSelectors.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement, popupSelectors);
  });
};

export const clearValidation = (formElement, popupSelectors) => {
  const inputList = Array.from(
    formElement.querySelectorAll(popupSelectors.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    popupSelectors.submitButtonSelector
  );
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, popupSelectors);
  });
};

//дщ
