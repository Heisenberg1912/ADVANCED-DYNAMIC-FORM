import { useState } from 'react';

const useFormValidation = () => {
  const [errors, setErrors] = useState({});

  const validate = (name, value) => {
    let error = "";
    switch (name) {
      case "fullName":
        if (!value) error = "Full Name is required";
        break;
      case "email":
        if (!value) error = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(value)) error = "Email is invalid";
        break;
      case "feedback":
        if (!value) error = "Feedback is required";
        else if (value.length < 50) error = "Feedback must be at least 50 characters";
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  return { errors, validate };
};

export default useFormValidation;
