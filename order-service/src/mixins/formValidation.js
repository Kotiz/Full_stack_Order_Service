// formValidation.js
import { reactive } from 'vue';

export function useFormValidation() {
  const state = reactive({
    formData: {
      username: '',
      device: '',
      whatError: '',
    },
    formErrors: {
      username: '',
      device: '',
      whatError: '',
    },
  });

  function validateForm() {
    state.formErrors = {};

    if (!state.formData.username.trim()) {
      state.formErrors.username = 'Imię  i nazwisko jest wymagane';
    }

    if (!state.formData.device.trim()) {
      state.formErrors.device = 'Nazwa urządzenia jest wymagana';
    }
    if (!state.formData.whatError.trim()) {
        state.formErrors.whatError = 'Hej ! Opisz usterkę !';
      }

    return Object.keys(state.formErrors).length === 0;
  }

  return {
    state,
    validateForm,
  };
}