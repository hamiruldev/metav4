import React, { useState } from "react";

import {
  Button,
  FormControl,
  FormHelperText,
  OutlinedInput,
  Stack,
  CircularProgress,
  Box,
  Typography,
  useMediaQuery,
  Divider,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { Formik } from "formik";

import BasicTabs from "./BasicTabs";
import TabPanel from "./TabPanel";
import { loginAuth, registerAuth } from '../../api/authApi'

const AuthForm = ({ htmlFor, handleFormStatus }) => {
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState();
  const [messageErr, setMessageErr] = useState();
  const [value, setValue] = useState(0);

  const matches = useMediaQuery("(max-width:425px)");

  const handleForm = (title, index) => {

    setMessageErr("")
    setMessage("")

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
                  setMessageErr("");
                  setLoading(true);

                  const avatarId = sessionStorage.getItem("avatar")

                  const formData = {
                    'username': values.username,
                    'email': values.email,
                    'password': values.password,
                    'avatar_id': avatarId
                  }

                  registerAuth(formData).then((res) => {

                    setLoading(false);

                    if (res?.response?.data?.success == false) {
                      if (res?.response?.data?.data?.email) {
                        setMessageErr("Email has already been taken");
                      }
                      else if (res?.response?.data?.data?.username) {
                        setMessageErr("Username has already been taken");
                      } else {
                        setMessageErr("Email and Username Taken");
                      }
                    }

                    if (res?.status == 200) {
                      setMessage("Register is successfull.");
                      handleFormStatus("successRegister")
                      const { avatar_id, email, password, token, username, user_id } = res?.data?.data

                      const userData = { avatar_id, email, username, user_id }
                      const JsonUserData = JSON.stringify(userData);

                      sessionStorage.setItem("token", token);
                      sessionStorage.setItem("user", JsonUserData);
                      sessionStorage.setItem("login", "true");

                    }


                  }).catch((err) => {
                    if (err) setLoading(false);
                    setMessage("Something went wrong, please try again");
                    return err;
                  });


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

                        {
                          messageErr && (
                            <>
                              <FormHelperText sx={{ color: "red", textAlign: "start" }}>
                                {messageErr}
                              </FormHelperText>
                            </>
                          )
                        }


                        <Box
                          sx={{
                            alignItems: "center",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <Button
                            id="formButton"
                            className="ButtonStandard"
                            sx={{
                              width: "30%",
                              backgroundColor: "#FFC000",
                              boxShadow: "5px 7px 7px -5px #000000 !important",
                              "&:hover": {
                                backgroundColor: "#ff9d00",
                              },

                              background: message == "Register is successfull." ? "linear-gradient(180deg,#89ff68 0%,#336d16 100%) !important" : "linear-gradient(to bottom, #ffec64 5%, #ffab23 100%)",
                              color: message == "Register is successfull." ? "#333333" : "white",

                            }}
                            size="large"
                            type="submit"
                          >
                            {isLoading ? (
                              <CircularProgress sx={{ color: "black" }} size={20} />
                            ) : (<>
                              {message == "Register is successfull." ? "Success" : "Submit"}
                            </>
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
                  Already have account ?  <span style={{
                    color: "red", cursor: "pointer",
                    textDecoration: "underline",
                  }} onClick={(() => {
                    handleForm("LOGIN", 1)
                  })}>Log In</span>
                </Typography>
              </Stack>
            </TabPanel>

            <TabPanel value={value} index={1}>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}

                onSubmit={async (values) => {
                  setMessage("");
                  setMessageErr("");
                  setLoading(true);

                  const formData = {
                    'email': values.email,
                    'password': values.password,
                  }

                  loginAuth(formData).then((res) => {

                    setLoading(false);
                    if (res?.response?.data?.success == false) {
                      setMessageErr("Email or passord incorrent");
                    }
                    if (res?.status == 200) {
                      setMessage("Login is successfull.");
                      handleFormStatus("successLogin")

                      const { avatar_id, token, username, user_id } = res?.data?.data
                      const userData = { avatar_id, username, user_id }
                      const JsonUserData = JSON.stringify(userData);

                      sessionStorage.setItem("token", token);
                      sessionStorage.setItem("user", JsonUserData);
                      sessionStorage.setItem("login", "true");

                    }





                  }).catch((err) => {
                    if (err) setLoading(false);
                    setMessageErr("Something went wrong, please try again");
                    return err;
                  });


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


                        {
                          messageErr && (
                            <>
                              <FormHelperText sx={{ color: "red", textAlign: "start" }}>
                                {messageErr}
                              </FormHelperText>
                            </>
                          )
                        }

                        <Box
                          sx={{
                            alignItems: "center",
                            pb: 3,
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <Button
                            className="ButtonStandard"
                            id="formButton"
                            sx={{
                              width: "40%",
                              backgroundColor: "#FFC000",
                              boxShadow: "5px 7px 7px -5px #000000 !important",
                              "&:hover": {
                                backgroundColor: "#ff9d00",
                              },

                              background: message == "Login is successfull." ? "linear-gradient(180deg,#89ff68 0%,#336d16 100%) !important" : "linear-gradient(to bottom, #ffec64 5%, #ffab23 100%)",
                              color: message == "Login is successfull." ? "#333333" : "white",

                            }}
                            size="large"
                            type="submit"
                          >
                            {isLoading ? (
                              <CircularProgress sx={{ color: "black" }} size={20} />
                            ) : (<>
                              {message == "Login is successfull." ? "Success" : "Submit"}
                            </>
                            )}
                          </Button>

                        </Box>


                      </Stack>
                    </form>
                  </>
                )}
              </Formik>

              <Divider> OR</Divider>

              <Stack sx={{ pt: 3 }}>
                <Typography
                  component={"p"}
                  variant="p"
                  sx={{ color: "white", textAlign: "center" }}
                >
                  Forgot Password ?  <span style={{ color: "red", cursor: "pointer", textDecoration: "underline" }} onClick={(() => {
                    handleForm("RESET", 2)
                  })} >Reset</span>
                </Typography>

                <Typography
                  component={"p"}
                  variant="p"
                  sx={{ color: "white", textAlign: "center" }}
                >
                  Don’t have account ?  <span style={{ color: "red", cursor: "pointer", textDecoration: "underline" }} onClick={(() => {
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
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <Button
                            className="ButtonStandard"
                            id="formButton"
                            sx={{
                              width: "30%",
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

                          {
                            messageErr && (
                              <>
                                <FormHelperText sx={{ color: "red", textAlign: "center", p: 2 }}>
                                  {messageErr}
                                </FormHelperText>
                              </>
                            )
                          }

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
      )
      }


    </>
  );
};

export default AuthForm;
