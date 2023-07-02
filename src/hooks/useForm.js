import { useState, useCallback } from "react";

const useForm = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isInputValid, setisInputValid] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChangeInput = (e) => {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));

    setErrors((errors) => ({ ...errors, [e.target.name]: e.target.validationMessage }));

    setisInputValid(() => ({ ...e.target.validity.valid, [e.target.name]: e.target.validity.valid }));

    setIsValid(e.target.form.checkValidity());
  };

  const resetForm = useCallback(() => {
    setValues({});
    setErrors({});
    setisInputValid({});
    setIsValid(false);
  }, []);

  return { values, errors, isInputValid, isValid, handleChangeInput, resetForm };
};

export default useForm;
