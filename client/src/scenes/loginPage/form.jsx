import React from "react";
import { useState } from "react"; 
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme
} from "@mui/material";
import { EditOutlinedIcon } from "@mui/icons-material/EditOutlined"; //to get that particular icon from mui
import { Formik } from "formik"; // for the form library
import * as yup from "yup"; //import everything fromyup, a validation library
import { useNavigate } from "react-router-dom"; //is this the same as link? to navigate when register and login
import { useDispatch } from "react-redux"; // to store user values and information
import { setLogin } from "state"; //once user sets in login page.
import Dropzone from "react-dropzone"; //so users can upload pictures or docs in the dropzone
import FlexBetween from "components/FlexBetween"; // the common CSS that is now a component

//to create a YUP validation schema, to determine the shape of how the form library is going to save this information. basically this is like the backend schema, we define the type and what is required
// basically this YUP's job is to validate the input and whether it matches the requirements.
const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    teacherOrStudent: yup.string().required("required"),
    picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
});

//set up the initial values
const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    teacherOrStudent: "",
    picture: "",
};

const initialValuesLogin = {
    email: "",
    password: ""
}

// create the form component.

const Form = () => {
    const [pageType, setPageType] = useState("login");
    const { pallete } = useTheme();
    const dispath = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    const handleFormSubmit = async(values, onSubmitProps) => {};
    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                        "& > div" : {gridColumn: isNonMobile ? undefined: "span 4"},
                    }}
                    >
                        {isRegister && (
                            <>
                            <TextField
                                label="First Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.firstName}
                                name="firstName"
                                error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                helperText={touched.firstName && errors.firstName}
                                sx={{ gridColumn: "span 2"}}
                                />
                            <TextField
                                label="Last Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.lastName}
                                name="lastName"
                                error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                helperText={touched.lastName && errors.lastName}
                                sx={{ gridColumn: "span 2"}}
                                />
                            <TextField
                                label="Location"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.location}
                                name="location"
                                error={Boolean(touched.location) && Boolean(errors.location)}
                                helperText={touched.location && errors.location}
                                sx={{ gridColumn: "span 4"}}
                                />
                            <TextField
                                label="Student or Teacher"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.studentOrTeacher}
                                name="studentOrTeacher"
                                error={Boolean(touched.studentOrTeacher) && Boolean(errors.studentOrTeacher)}
                                helperText={touched.studentOrTeacher && errors.studentOrTeacher}
                                sx={{ gridColumn: "span 4"}}
                                />
                                <Box></Box> //stopped here 3:11:17 at 8 Feb 2023
                            </>
                        )}
                    </Box>
                </form>           
            )}

        </Formik>
    )
}

export default Form;