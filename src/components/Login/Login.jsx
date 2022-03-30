import "./Login.css";
import { useState } from "react";
import React from "react";
import axios from "axios";

// import useful stuff from material
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

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const submit = async () => {
    let headersList = {
      Accept: "*/*",
    };
    let reqOptions = {
      url: "https://apipolysmash.herokuapp.com/api/users/login",
      method: "post",
      mode: "no-cors",
      headers: headersList,
      data: values,
    };

    axios(reqOptions).then(function (response) {
      localStorage.setItem("token", response.data.token);
      window.location.reload();
    });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Container>
      <Typography gutterBottom variant="h2" component="div" sx={{ my: 6 }}>
        LOGIN
      </Typography>
      <Box class="box">
        <FormControl sx={{ m: 1, width: "20vw" }} variant="outlined">
          <TextField
            required
            id="email"
            label="Email"
            variant="outlined"
            value={values.email}
            onChange={handleChange("email")}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "20vw" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Button
          type="submit"
          onClick={submit}
          size="large"
          color="secondary"
          variant="contained"
          sx={{ p: "15px 22px", mt: "8px", mb: "40vh" }}
        >
          <AddIcon />
        </Button>
      </Box>
    </Container>
  );
}

export default Login;
