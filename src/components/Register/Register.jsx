import "./Register.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

import * as React from "react";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";

function Register() {
  const [values, setValues] = React.useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });

  const submit = async () => {
    let headersList = {
      Accept: "*/*",
    };
    let reqOptions = {
      url: "https://apipolysmash.herokuapp.com/api/users/register",
      method: "post",
      mode: "no-cors",
      headers: headersList,
      data: values,
    };

    axios(reqOptions).then(function (response) {
      window.location.reload();
    });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <Container>
      <Typography gutterBottom variant="h2" component="div" sx={{ my: 6 }}>
        REGISTER
      </Typography>
      <Box class="box">
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <TextField
            required
            id="username"
            label="Username"
            variant="outlined"
            value={values.username}
            onChange={handleChange("username")}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <TextField
            required
            id="firstname"
            label="Firstname"
            variant="outlined"
            value={values.firstname}
            onChange={handleChange("firstname")}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <TextField
            required
            id="lastname"
            label="Lastname"
            variant="outlined"
            value={values.lastname}
            onChange={handleChange("lastname")}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <TextField
            required
            id="email"
            label="Email"
            variant="outlined"
            value={values.email}
            onChange={handleChange("email")}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password" required>
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type="password"
            value={values.password}
            onChange={handleChange("password")}
            label="Password"
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-repeatPassword" required>
            Repeat Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-repeatPassword"
            type="password"
            value={values.passwordRepeat}
            onChange={handleChange("passwordRepeat")}
            label="Repeat Password"
          />
        </FormControl>
        <Button
          type="submit"
          onClick={submit}
          size="large"
          color="secondary"
          variant="contained"
          sx={{ p: "15px 22px", mt: "8px", mb: "20vh" }}
        >
          <AddIcon />
        </Button>
      </Box>
    </Container>
  );
}

export default Register;
