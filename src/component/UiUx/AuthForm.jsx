import React, { useEffect, useState } from "react";

import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Stack,
  CircularProgress,
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { Formik } from "formik";

import axios from "axios";

import emailjs from "@emailjs/browser";
import BasicTabs from "./BasicTabs";
import TabPanel from "./TabPanel";


const AuthForm = ({ htmlFor }) => {
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState();
  const [value, setValue] = useState(0);

  const matches = useMediaQuery("(max-width:425px)");

  const handleForm = (title, index) => {

    const elTitle = document.getElementById("titleDialog")
    elTitle.textContent = title
    setValue(index)

  }


  return (
    <>
      {message != "Message is sent." ? (
        <>


          <BasicTabs setValue={setValue} value={value} >

            <TabPanel value={value} index={0}>

              <Formik
                initialValues={{
                  username: "",
                  email: "",
                  password: "",
                }}
                onSubmit={async (values) => {
                  setMessage("");
                  setLoading(true);

                  sessionStorage.setItem("login", "true");

                  setLoading(false);


                  console.log("values", values)

                  // const formData = {
                  //     'first_name': values.name,
                  //     'last_name': values.name,
                  //     'status_id': values.name,
                  //     'email': values.email,
                  //     'phone': values.phone,
                  //     'company_name': values.company,
                  //     'hear_about_us': values.hear,
                  //     'inquiry': values.help
                  // }

                  // emailjs
                  //   .send(
                  //     "service_sy7u3st",
                  //     "template_ou2urpc",
                  //     {
                  //       username: values?.username,
                  //       password: values?.password
                  //     },
                  //     "YgahqqRIDGkQP1JX_"
                  //   )
                  //   .then((res) => {
                  //     setLoading(false);
                  //     setMessage("Message is sent.");
                  //   })
                  //   .catch((err) => {
                  //     if (err) setLoading(false);
                  //     setMessage("Something went wrong, please try again");
                  //     return err;
                  //   });
                }}
              >
                {(props) => (
                  <>
                    <form
                      style={{ width: "inherit" }}
                      onSubmit={props.handleSubmit}
                      onChange={props.handleChange}
                    >
                      <Stack
                        direction={"column"}
                        spacing={2}
                        sx={{ pt: 3, color: "white" }}
                      >
                        <FormControl hiddenLabel fullWidth>
                          <OutlinedInput
                            required
                            placeholder="Username"
                            id="outlined-adornment-name-register"
                            type="text"
                            name="username"
                            size="small"
                            value={props.values.username}
                            onBlur={props.handleBlur}
                            onChange={props.handleChange}
                            sx={{ backgroundColor: "white" }}
                          />
                        </FormControl>

                        <FormControl hiddenLabel fullWidth>
                          <OutlinedInput
                            required
                            placeholder="Email"
                            id="outlined-adornment-name-register"
                            type="email"
                            name="email"
                            size="small"
                            value={props.values.email}
                            onBlur={props.handleBlur}
                            onChange={props.handleChange}
                            sx={{ backgroundColor: "white" }}
                          />
                        </FormControl>

                        <FormControl hiddenLabel fullWidth>
                          <OutlinedInput
                            required
                            placeholder="Password"
                            id="outlined-adornment-name-register"
                            type="password"
                            name="password"
                            size="small"
                            value={props.values.password}
                            onBlur={props.handleBlur}
                            onChange={props.handleChange}
                            sx={{ backgroundColor: "white" }}
                          />
                        </FormControl>

                        <Box
                          sx={{
                            alignItems: "center",
                            pb: 3,
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <Button
                            id="formButton"
                            sx={{
                              display: "none",
                              width: "50%",
                              color: "black",
                              backgroundColor: "#FFC000",
                              boxShadow: "5px 7px 7px -5px #000000 !important",
                              "&:hover": {
                                backgroundColor: "#ff9d00",
                              },
                            }}
                            size="large"
                            type="submit"
                          >
                            {isLoading ? (
                              <CircularProgress sx={{ color: "black" }} size={20} />
                            ) : (
                              "Submit"
                            )}
                          </Button>
                        </Box>
                      </Stack>
                    </form>
                  </>
                )}
              </Formik>

              <Stack sx={{ pt: 3 }}>

                <Typography
                  component={"p"}
                  variant="p"
                  sx={{ color: "white", textAlign: "center" }}
                >
                  Already have account ?  <span style={{ color: "red", cursor: "pointer" }} onClick={(() => {
                    handleForm("LOGIN", 1)
                  })}>Log In</span>
                </Typography>
              </Stack>
            </TabPanel>

            <TabPanel value={value} index={1}>
              <Formik
                initialValues={{
                  username: "",
                  password: "",
                }}
                onSubmit={async (values) => {
                  setMessage("");

                  setLoading(true);

                  sessionStorage.setItem("login", true);

                  setLoading(false);

                  console.log("values", values)

                  // const formData = {
                  //     'first_name': values.name,
                  //     'last_name': values.name,
                  //     'status_id': values.name,
                  //     'email': values.email,
                  //     'phone': values.phone,
                  //     'company_name': values.company,
                  //     'hear_about_us': values.hear,
                  //     'inquiry': values.help
                  // }

                  // emailjs
                  //   .send(
                  //     "service_sy7u3st",
                  //     "template_ou2urpc",
                  //     {
                  //       username: values?.username,
                  //       password: values?.password
                  //     },
                  //     "YgahqqRIDGkQP1JX_"
                  //   )
                  //   .then((res) => {
                  //     setLoading(false);
                  //     setMessage("Message is sent.");
                  //   })
                  //   .catch((err) => {
                  //     if (err) setLoading(false);
                  //     setMessage("Something went wrong, please try again");
                  //     return err;
                  //   });
                }}
              >
                {(props) => (
                  <>
                    <form
                      style={{ width: "inherit" }}
                      onSubmit={props.handleSubmit}
                      onChange={props.handleChange}
                    >
                      <Stack
                        direction={"column"}
                        spacing={2}
                        sx={{ pt: 3, color: "white" }}
                      >
                        <FormControl hiddenLabel fullWidth>
                          <OutlinedInput
                            required
                            placeholder="Username"
                            id="outlined-adornment-name-register"
                            type="text"
                            name="username"
                            size="small"
                            value={props.values.username}
                            onBlur={props.handleBlur}
                            onChange={props.handleChange}
                            sx={{ backgroundColor: "white" }}
                          />
                        </FormControl>

                        <FormControl hiddenLabel fullWidth>
                          <OutlinedInput
                            required
                            placeholder="Password"
                            id="outlined-adornment-name-register"
                            type="password"
                            name="password"
                            size="small"
                            value={props.values.password}
                            onBlur={props.handleBlur}
                            onChange={props.handleChange}
                            sx={{ backgroundColor: "white" }}
                          />
                        </FormControl>

                        <Box
                          sx={{
                            alignItems: "center",
                            pb: 3,
                            display: "flex",
                            justifyContent: "center",
                            // display: 'none',
                          }}
                        >
                          <Button
                            id="formButton"
                            sx={{
                              display: "none",
                              width: "50%",
                              color: "black",
                              backgroundColor: "#FFC000",
                              boxShadow: "5px 7px 7px -5px #000000 !important",
                              "&:hover": {
                                backgroundColor: "#ff9d00",
                              },
                            }}
                            size="large"
                            type="submit"
                          >
                            {isLoading ? (
                              <CircularProgress sx={{ color: "black" }} size={20} />
                            ) : (
                              "Submit"
                            )}
                          </Button>
                        </Box>
                      </Stack>
                    </form>
                  </>
                )}
              </Formik>

              <Stack sx={{ pt: 3 }}>
                <Typography
                  component={"p"}
                  variant="p"
                  sx={{ color: "white", textAlign: "center" }}
                >
                  Forgot Password ?  <span style={{ color: "red", cursor: "pointer" }} onClick={(() => {
                    handleForm("RESET", 2)
                  })} >Reset</span>
                </Typography>
                <Typography
                  component={"p"}
                  variant="p"
                  sx={{ color: "white", textAlign: "center" }}
                >
                  Don’t have account ?  <span style={{ color: "red", cursor: "pointer" }} onClick={(() => {
                    handleForm("REGISTER", 0)
                  })} >Sign Up</span>
                </Typography>
              </Stack>
            </TabPanel>

            <TabPanel value={value} index={2}>
              <Formik
                initialValues={{
                  email: "",
                }}
                onSubmit={async (values) => {
                  setMessage("");
                  setLoading(true);

                  console.log("values", values)

                  // const formData = {
                  //     'first_name': values.name,
                  //     'last_name': values.name,
                  //     'status_id': values.name,
                  //     'email': values.email,
                  //     'phone': values.phone,
                  //     'company_name': values.company,
                  //     'hear_about_us': values.hear,
                  //     'inquiry': values.help
                  // }

                  // emailjs
                  //   .send(
                  //     "service_sy7u3st",
                  //     "template_ou2urpc",
                  //     {
                  //       username: values?.username,
                  //       password: values?.password
                  //     },
                  //     "YgahqqRIDGkQP1JX_"
                  //   )
                  //   .then((res) => {
                  //     setLoading(false);
                  //     setMessage("Message is sent.");
                  //   })
                  //   .catch((err) => {
                  //     if (err) setLoading(false);
                  //     setMessage("Something went wrong, please try again");
                  //     return err;
                  //   });
                }}
              >
                {(props) => (
                  <>
                    <form
                      style={{ width: "inherit" }}
                      onSubmit={props.handleSubmit}
                      onChange={props.handleChange}
                    >
                      <Stack
                        direction={"column"}
                        spacing={2}
                        sx={{ pt: 3, color: "white" }}
                      >
                        <FormControl hiddenLabel fullWidth>
                          <OutlinedInput
                            required
                            placeholder="Email"
                            id="outlined-adornment-name-register"
                            type="email"
                            name="email"
                            size="small"
                            value={props.values.email}
                            onBlur={props.handleBlur}
                            onChange={props.handleChange}
                            sx={{ backgroundColor: "white" }}
                          />
                        </FormControl>

                        <Box
                          sx={{
                            alignItems: "center",
                            pb: 3,
                            display: "flex",
                            justifyContent: "center",
                            // display: 'none',
                          }}
                        >
                          <Button
                            id="formButton"
                            sx={{
                              display: "none",
                              width: "50%",
                              color: "black",
                              backgroundColor: "#FFC000",
                              boxShadow: "5px 7px 7px -5px #000000 !important",
                              "&:hover": {
                                backgroundColor: "#ff9d00",
                              },
                            }}
                            size="large"
                            type="submit"
                          >
                            {isLoading ? (
                              <CircularProgress sx={{ color: "black" }} size={20} />
                            ) : (
                              "Submit"
                            )}
                          </Button>
                        </Box>
                      </Stack>
                    </form>
                  </>
                )}
              </Formik>

              <Stack sx={{ pt: 3 }}>

                <Typography
                  component={"p"}
                  variant="p"
                  sx={{ color: "white", textAlign: "center" }}
                >
                  Don’t have account ?  <span style={{ color: "red", cursor: "pointer" }} onClick={(() => {
                    handleForm("REGISTER", 0)
                  })} >Sign Up</span>
                </Typography>
              </Stack>
            </TabPanel>

          </BasicTabs>

        </>
      ) : (
        <>
          <Stack sx={{ alignItems: "center", p: 3 }}>
            <CheckCircleIcon sx={{ color: "#FFC000", fontSize: "5em" }} />
            <Typography
              component={"h3"}
              variant="h3"
              sx={{ color: "white", textAlign: "center" }}
            >
              Message is sent.
            </Typography>
            <Typography
              component={"h6"}
              variant="h6"
              sDx={{ color: "white", textAlign: "center" }}
            >
              We’ll get in touch with you soon.
            </Typography>
          </Stack>
        </>
      )}

      {message == "Something went wrong, please try again" && (
        <>
          <FormHelperText sx={{ color: "red", textAlign: "center", p: 2 }}>
            {message}
          </FormHelperText>
        </>
      )}
    </>
  );
};

export default AuthForm;
