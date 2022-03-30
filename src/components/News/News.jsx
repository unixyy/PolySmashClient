import "./News.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Admin } from "../Middleware.js";

// import content from mui
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";

function News() {
  const [datas, setData] = useState([]);
  const [news, setNews] = useState({
    title: "",
    description: "",
  });

  const handleChange = (prop) => (event) => {
    setNews({ ...news, [prop]: event.target.value });
  };

  const addNews = async () => {
    if (Admin()) {
      let headersList = {
        Accept: "*/*",
        Autorization: localStorage.getItem("token"),
      };
      let reqOptions = {
        url: "https://apipolysmash.herokuapp.com/api/news",
        method: "post",
        mode: "no-cors",
        headers: headersList,
        data: news,
      };

      axios(reqOptions).then(function (response) {
        window.location.reload();
      });
    } else {
      alert("you do not have the right to do this....");
    }
  };

  useEffect(() => {
    let headersList = {
      Accept: "*/*",
    };

    let reqOptions = {
      url: "https://apipolysmash.herokuapp.com/api/news/",
      method: "GET",
      mode: "no-cors",
      headers: headersList,
    };

    axios.request(reqOptions).then(function (response) {
      setData(response.data.reverse());
    });
  }, []);

  return (
    <Box sx={{ mt: "5vh" }}>
      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <TextField
          required
          id="title"
          label="Title"
          variant="outlined"
          value={news.title}
          onChange={handleChange("title")}
        />
      </FormControl>
      <FormControl sx={{ m: 1, width: "70vw" }} variant="outlined">
        <TextField
          required
          id="description"
          label="Description"
          variant="outlined"
          value={news.description}
          multiline
          maxRows={10}
          onChange={handleChange("description")}
        />
      </FormControl>
      <Button
        onClick={addNews}
        size="large"
        color="secondary"
        variant="contained"
        sx={{ p: "15px 22px", mt: "8px" }}
      >
        <AddIcon />
      </Button>

      {datas.map((data) => (
        <Box sx={{ borderBottom: 1, p: "2vh" }}>
          <Typography variant="h3">{data.title}</Typography>
          <Typography variant="subtitle1">{data?.date || ""}</Typography>
          <Typography variant="b1">{data.description}</Typography>
        </Box>
      ))}
    </Box>
  );
}

export default News;
