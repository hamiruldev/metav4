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

import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { Field, Formik } from "formik";
import { TextField } from "formik-mui";

import PI from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'

import FormControlSelect from "./FormControlSelect";
import axios from "axios";

import emailjs from '@emailjs/browser';

const category = [
    {
        value: 'Social Media',
        label: 'Social Media'
    },
    {
        value: 'Google Search',
        label: 'Google Search'
    },
    {
        value: 'Advertisement',
        label: 'Advertisement'
    }
    ,
    {
        value: 'Other',
        label: 'Other'
    }
];
const ReactPhoneInput = import.meta.env.PROD ? (PI).default : PI;

const Form = () => {
    const [isLoading, setLoading] = useState(false);
    const [message, setMessage] = useState();
    const [isTime, setTime] = useState(false)

    const matches = useMediaQuery("(max-width:425px)");



    return (
        <>

            {message != 'Message is sent.' ?
                <>
                    <Typography variant="h5" sx={{ color: 'white', textAlign: "center", pt: 4 }}>
                        How can we <span style={{ color: 'red' }}> HELP  </span> you?
                    </Typography>
                    <Formik
                        initialValues={{
                            name: '',
                            company: '',
                            phone: '',
                            email: '',
                            hear: '',
                            help: '',
                        }}
                        onSubmit={async (values) => {
                            setMessage("")
                            setLoading(true);

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

                            emailjs.send("service_sy7u3st", "template_ou2urpc", {
                                to_name: "info@sysniq.my",
                                from_name: values?.name,
                                phone: values?.phone,
                                email: values?.email,
                                hear: values?.hear,
                                inquiry: values?.help,
                                company: values?.company

                            }, 'YgahqqRIDGkQP1JX_').then((res) => {
                                setLoading(false);
                                setMessage("Message is sent.")
                            }).catch((err) => {

                                if (err) setLoading(false);
                                setMessage("Something went wrong, please try again")
                                return err;
                            });
                        }}
                    >
                        {(props) => (
                            <>
                                <form style={{ width: "inherit" }} onSubmit={props.handleSubmit} onChange={props.handleChange} >
                                    <Stack direction={"column"} spacing={2} sx={{ pt: 3, color: "white" }}>
                                        <FormControl hiddenLabel fullWidth>
                                            <OutlinedInput
                                                required
                                                placeholder="Name"
                                                id="outlined-adornment-name-register"
                                                type="text"
                                                name="name"
                                                size="small"

                                                value={props.values.name}
                                                onBlur={props.handleBlur}
                                                onChange={props.handleChange}
                                            />
                                        </FormControl>

                                        <Box
                                            sx={{
                                                '& > :not(style)': {
                                                    width: !matches ? '49%' : 'none',
                                                    mb: matches ? '16px' : 0,
                                                },
                                                display: "flex",
                                                justifyContent: "space-between",
                                                flexDirection: matches ? 'column' : 'none'
                                            }}
                                            noValidate
                                            autoComplete="off"
                                        >
                                            <FormControl fullWidth>
                                                <OutlinedInput
                                                    required
                                                    type="text"
                                                    name="company"
                                                    size="small"
                                                    placeholder="Company"
                                                    value={props.values.company}
                                                    onBlur={props.handleBlur}
                                                    onChange={props.handleChange}

                                                />
                                            </FormControl>
                                            <FormControl
                                                sx={{ mb: matches ? "0px !important" : null, color: "black" }}
                                                fullWidth>
                                                <>
                                                    <Field
                                                        required
                                                        label="phone"

                                                        component={ReactPhoneInput}
                                                        size="small"
                                                        name="phone"

                                                        id="phone"
                                                        pattern="[0-9]{10}"
                                                        preferredCountries={["sg"]}
                                                        prefix={'+'}
                                                        country="sg"
                                                        placeholder='+641111111'
                                                        inputStyle={{
                                                            height: "45px",
                                                            width: "100%",
                                                            backgroundColor: "#FFC000",
                                                            color: "black",
                                                            filter: "blur(0px)",
                                                        }}
                                                        inputProps={{
                                                            autoFocus: false,
                                                            placeholder: "+6543212123"
                                                        }}
                                                        value={props.setFieldValue.phone}
                                                        onChange={(phone) => {
                                                            props.setFieldValue("phone", phone);
                                                        }}
                                                    />
                                                </>
                                            </FormControl>
                                        </Box>

                                        <FormControl fullWidth>
                                            <OutlinedInput

                                                required
                                                type="email"
                                                name="email"
                                                size="small"
                                                placeholder="Email"
                                                value={props.values.email}
                                                onBlur={props.handleBlur}
                                                onChange={props.handleChange}

                                            />
                                        </FormControl>

                                        <FormControlSelect
                                            required
                                            currencies={category}
                                            size="small"
                                            id="hear"
                                            name="hear"
                                            // captionLabel="How did you hear about us?"
                                            // label="How did you hear about us?"
                                            value={props.values.hear}
                                            onBlur={props.handleBlur}
                                            onChange={props.handleChange}
                                            fullWidth
                                        />



                                        <FormControl fullWidth>
                                            <Field
                                                type="text"
                                                name="help"
                                                // label="How can we help you?"
                                                size="small"
                                                component={TextField}
                                                placeholder="How can we help you?"
                                                multiline
                                                rows={4}
                                                value={props.values.help}
                                                onBlur={props.handleBlur}
                                                onChange={props.handleChange}
                                                sx={{ color: "white" }}
                                            />
                                        </FormControl>

                                        <Box sx={{ alignItems: "center", pb: 3, display: "flex", justifyContent: 'center' }}>
                                            <Button sx={{
                                                width: "50%", color: "black", backgroundColor: "#FFC000", boxShadow: "5px 7px 7px -5px #000000 !important",
                                                "&:hover": {
                                                    backgroundColor: "#ff9d00",
                                                },
                                            }} size="large" type="submit">
                                                {isLoading ? <CircularProgress sx={{ color: "black" }} size={20} /> : "Submit"}
                                            </Button>
                                        </Box>

                                    </Stack>


                                </form>
                            </>
                        )}
                    </Formik >
                </> :
                <Stack sx={{ alignItems: "center", p: 3 }}>
                    <CheckCircleIcon sx={{ color: "#FFC000", fontSize: '5em' }} />
                    <Typography variant="h3" sx={{ color: "white", textAlign: "center" }}>
                        Message is sent.
                    </Typography>
                    <Typography variant="h6" sx={{ color: "white", textAlign: "center" }}>
                        We’ll get in touch with you soon.
                    </Typography>
                </Stack>
            }


            {message == 'Something went wrong, please try again' &&
                <FormHelperText sx={{ color: "red", textAlign: 'center', p: 2 }}>
                    {message}
                </FormHelperText>}
        </>
    );
};

export default Form;
