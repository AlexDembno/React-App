import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { fetchRegister } from "../../../redux/auth/authOperations";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./RegisterForm.module.scss";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const firstNameFieldId = useId();
  const lastNameFieldId = useId();
  const emailFieldId = useId();
  const passwordFieldId = useId();

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    if (!values.first_name) {
      errors.first_name = "Required";
    } else if (values.first_name === "admin") {
      errors.first_name = "Nice try!";
    }

    return errors;
  };

  return (
    <div className={styles.wrapperPage}>
      <h2 className={styles.text}>Register Form</h2>
      <div className={styles.container}>
        <Formik
          initialValues={{
            first_name: "",
            last_name: "",
            email: "",
            password: "",
          }}
          validate={validate}
          onSubmit={(values, formik) => {
            dispatch(fetchRegister(values));
            console.log({ values });

            formik.resetForm();
          }}
        >
          {({ errors, touched, isValidating }) => (
            <Form className={styles.wrapperForm}>
              <label htmlFor={firstNameFieldId} className={styles.labelForm}>
                First name
              </label>
              <Field
                className={styles.input}
                name="first_name"
                maxLength={20}
                id={firstNameFieldId}
                placeholder={
                  errors.last_name && touched.last_name ? errors.last_name : ""
                }
              />
              <ErrorMessage
                name="first_name"
                component="div"
                className={styles.error}
              />

              <label htmlFor={lastNameFieldId}>Last name</label>
              <Field
                className={styles.input}
                name="last_name"
                maxLength={20}
                id={lastNameFieldId}
              />

              <label htmlFor={emailFieldId}>Email</label>
              <Field
                className={styles.input}
                name="email"
                maxLength={20}
                id={emailFieldId}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.error}
              />

              <label htmlFor={passwordFieldId}>Password</label>
              <Field
                className={styles.input}
                name="password"
                maxLength={20}
                id={passwordFieldId}
              />
              <ErrorMessage
                name="password"
                component="div"
                className={styles.error}
              />

              <button className={styles.button} type="submit">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;
