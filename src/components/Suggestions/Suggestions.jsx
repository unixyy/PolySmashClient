// import useful stuff
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./Suggestions.css";
import { Admin } from "../Middleware.js";

// import content from mui
import { Container } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

function Suggestions() {
  const [datas, setData] = useState([]);
  const [sug, setSug] = useState({
    title: "",
    description: "",
    author: "",
  });

  const handleChange = (prop) => (event) => {
    setSug({ ...sug, [prop]: event.target.value });
  };

  useEffect(() => {
    let headersList = {
      Accept: "*/*",
    };

    let reqOptions = {
      url: "https://apipolysmash.herokuapp.com/api/suggestions/",
      method: "GET",
      mode: "no-cors",
      headers: headersList,
    };

    axios.request(reqOptions).then(function (response) {
      setData(response.data.reverse());
    });
  }, []);

  const addSug = async () => {
    if (Admin()) {
      let headersList = {
        Accept: "*/*",
        Autorization: localStorage.getItem("token"),
      };
      let reqOptions = {
        url: "https://apipolysmash.herokuapp.com/api/suggestions",
        method: "post",
        mode: "no-cors",
        headers: headersList,
        data: sug,
      };

      axios(reqOptions).then(function (response) {
        console.log("something added");
        window.location.reload();
      });
    } else {
      alert("you do not have the right to do this....");
    }
  };
  return (
    <Box sx={{ mt: "5vh" }}>
      <FormControl
        sx={{ m: 1, width: "25ch", theme: "dark" }}
        variant="outlined"
      >
        <TextField
          required
          id="author"
          label="Author"
          variant="outlined"
          value={sug.author}
          onChange={handleChange("author")}
        />
      </FormControl>
      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <TextField
          required
          id="title"
          label="Title"
          variant="outlined"
          value={sug.title}
          onChange={handleChange("title")}
        />
      </FormControl>
      <FormControl sx={{ m: 1, width: "70vw" }} variant="outlined">
        <TextField
          id="description"
          label="Description"
          variant="outlined"
          value={sug.description}
          multiline
          maxRows={10}
          onChange={handleChange("description")}
        />
      </FormControl>
      <Button
        onClick={addSug}
        size="large"
        color="secondary"
        variant="contained"
        sx={{ p: "15px 22px", mt: "8px" }}
      >
        <AddIcon />
      </Button>
      <Grid container spacing={0} sx={{ p: "1vh", mt: "4vh" }}>
        <Grid item xs={2}>
          <Typography variant="h4">Author</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h4">Title</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography variant="h4">Description</Typography>
        </Grid>
        {datas.map((data, i) => (
          <Grid container spacing={0} p={2}>
            <Grid item xs={2}>
              <Paper id={"data" + i} sx={{ height: "4vh" }}>
                {data.author}
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper sx={{ height: "4vh" }}>{data.title}</Paper>
            </Grid>
            <Grid item xs={7}>
              <Paper sx={{ height: "4vh" }}>{data.description}</Paper>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Suggestions;
