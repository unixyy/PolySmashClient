import "./Store.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Admin, getUserEmail } from "../Middleware.js";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";

function Store() {
  const [datas, setData] = useState([]);
  const [values, setValues] = useState({
    title: "",
    description: "",
    price: "",
    source: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  useEffect(() => {
    let headersList = {
      Accept: "*/*",
    };

    let reqOptions = {
      url: "https://apipolysmash.herokuapp.com/api/store/",
      method: "GET",
      mode: "no-cors",
      headers: headersList,
    };

    axios.request(reqOptions).then(function (response) {
      setData(response.data.reverse());
    });
  }, []);

  const buyItem = async (datas) => {
    var points;
    let headersList = {
      Accept: "*/*",
      Autorization: localStorage.getItem("token"),
    };

    let reqOptions = {
      url: "https://apipolysmash.herokuapp.com/api/users/peruser",
      method: "post",
      mode: "no-cors",
      headers: headersList,
      data: { email: getUserEmail(), id: datas._id },
    };

    points = await axios(reqOptions).then(function (response) {
      return response.data.score;
    });
    if (points >= datas.price) {
      reqOptions = {
        url: "https://apipolysmash.herokuapp.com/api/store",
        method: "delete",
        mode: "no-cors",
        headers: headersList,
        data: { id: datas._id },
      };

      axios(reqOptions).then(function (response) {});
      console.log(getUserEmail());
      console.log(datas.price);
      reqOptions = {
        url: "https://apipolysmash.herokuapp.com/api/users/dec",
        method: "put",
        mode: "no-cors",
        headers: headersList,
        data: { email: getUserEmail(), score: datas.price },
      };

      axios(reqOptions).then(function (response) {
        window.location.assign(
          "https://62448739b41a4d2aa36180cf--gregarious-biscuit-b525ec.netlify.app/"
        );
      });
    } else {
      alert("you need more points to buy this !");
    }
  };

  const addItem = async () => {
    if (Admin()) {
      let headersList = {
        Accept: "*/*",
        Autorization: localStorage.getItem("token"),
      };
      let reqOptions = {
        url: "https://apipolysmash.herokuapp.com/api/store",
        method: "post",
        mode: "no-cors",
        headers: headersList,
        data: values,
      };

      axios(reqOptions).then(function (response) {
        window.location.assign(
          "https://62448739b41a4d2aa36180cf--gregarious-biscuit-b525ec.netlify.app/"
        );
      });
    } else {
      alert("you do not have the right to do this....");
    }
  };

  return (
    <div class="formdiv">
      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <TextField
          required
          id="title"
          label="Title"
          variant="outlined"
          value={values.title}
          onChange={handleChange("title")}
        />
      </FormControl>
      <FormControl sx={{ m: 1, width: "14ch" }}>
        <TextField
          required
          id="price"
          label="Price"
          type="number"
          value={values.price}
          onChange={handleChange("price")}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </FormControl>
      <Button
        onClick={addItem}
        size="large"
        color="secondary"
        variant="contained"
        sx={{ p: "15px 22px", my: "9px", mx: "5px" }}
      >
        <AddIcon />
      </Button>
      <FormControl sx={{ m: 1, width: "100vw" }} variant="outlined">
        <TextField
          required
          id="link"
          label="Image link"
          variant="outlined"
          value={values.source}
          onChange={handleChange("source")}
        />
      </FormControl>
      <FormControl sx={{ m: 1, width: "100vw" }} variant="outlined">
        <TextField
          id="description"
          label="Description"
          variant="outlined"
          value={values.description}
          multiline
          maxRows={10}
          onChange={handleChange("description")}
        />
      </FormControl>
      <div class="storediv">
        {datas.map((data) => (
          <Card sx={{ maxWidth: 345, minWidth: 345, m: "1vh" }}>
            <CardActionArea
              onClick={() => {
                buyItem(data);
              }}
            >
              <CardMedia
                component="img"
                height="384"
                image={data.source}
                alt={data.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {data.title}
                </Typography>
                <Typography variant="h6">
                  {data.price + (data.price > 1 ? " Points" : " Point")}
                </Typography>
                <Typography variant="subtitle2">Description</Typography>
                <Typography variant="body2" color="text.secondary">
                  {data.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Store;
