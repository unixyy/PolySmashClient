// import useful stuff
import "./Game.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { getUserEmail } from "../Middleware.js";

// import content from mui
import { Container } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Button from "@mui/material/Button";

function randomGet2(number) {
  var rand1 = Math.floor(Math.random() * number);
  var rand2 = Math.floor(Math.random() * number);
  while (rand1 === rand2) {
    rand2 = Math.floor(Math.random() * number);
  }
  return [rand1, rand2];
}

function Game() {
  const [selected, setSelected] = useState([]);
  const [winner, setWinner] = useState([]);

  const [list, setList] = useState([]);
  const [random, setRandom] = useState([0, 1]);
  const [score, setScore] = useState(0);

  const ChoiceScoreUpdate = async () => {
    let headersList = {
      Accept: "*/*",
      Autorization: localStorage.getItem("token"),
    };

    let reqOptions = {
      url: "http://localhost:8000/api/choices/",
      method: "put",
      mode: "no-cors",
      headers: headersList,
      data: { id: selected, score: 1 },
    };

    axios(reqOptions).then(function (response) {
      // console.log(response.data);
    });
  };

  const setPoints = () => {
    let headersList = {
      Accept: "*/*",
      Autorization: localStorage.getItem("token"),
    };
    let reqOptions = {
      url: "http://localhost:8000/api/users/",
      method: "put",
      mode: "no-cors",
      headers: headersList,
      data: { email: getUserEmail(), score: score },
    };

    axios(reqOptions).then(function (response) {
      window.location.reload();
    });
  };

  const winOrLoose = async () => {
    let headersList = {
      Accept: "*/*",
      Autorization: localStorage.getItem("token"),
    };

    let reqOptions = {
      url: "http://localhost:8000/api/choices/ask",
      method: "post",
      mode: "no-cors",
      headers: headersList,
      data: { id1: list[random[0]].usersId, id2: list[random[1]].usersId },
    };

    axios(reqOptions).then(function (response) {
      setWinner(response.data);
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      winOrLoose();
    }, 500);
    return () => clearTimeout(timer);
    // new Promise((r) => setTimeout(r, 100000));
  });

  useEffect(() => {
    let headersList = {
      Accept: "*/*",
    };

    let reqOptions = {
      url: "http://localhost:8000/api/choices/",
      method: "GET",
      mode: "no-cors",
      headers: headersList,
    };

    axios.request(reqOptions).then(function (response) {
      // console.log(response.data);
      setList(response.data);
    });
  }, []);

  return (
    <div>
      <Typography variant="h3" sx={{ mt: "5vh" }}>
        {"Score : " + score}
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        disabled={score < 7 ? true : false}
        onClick={setPoints}
      >
        save my points !
      </Button><br/>
      <Typography variant="overline">min. 7 is required</Typography>
      <Container maxWidth="lg" class="container test">
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea
            onClick={async () => {
              setSelected(list[random[0]].usersId);
              ChoiceScoreUpdate();
              if (winner[0].usersId === list[random[0]].usersId) {
                setScore(score + 1);
              } else if (winner[0].usersId === 0) {
              } else {
                setScore(0);
              }
              setRandom(randomGet2(6));
            }}
          >
            <CardMedia
              component="img"
              height="478"
              src={list[random[0]]?.source || ""}
              alt="face1"
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h4"
                sx={{ textTransform: "capitalize" }}
              >
                {list[random[0]]?.firstname || ""}{" "}
                {list[random[0]]?.lastname || ""}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea
            onClick={async () => {
              ChoiceScoreUpdate();
              // console.log(winner);
              setSelected(list[random[1]].usersId);
              if (winner[0].usersId === list[random[1]].usersId) {
                setScore(score + 1);
              } else if (winner[0].usersId === 0) {
              } else {
                setScore(0);
              }
              setRandom(randomGet2(6));
            }}
          >
            <CardMedia
              component="img"
              height="478"
              src={list[random[1]]?.source || ""}
              alt="face2"
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h4"
                sx={{ textTransform: "capitalize" }}
              >
                {list[random[1]]?.firstname || ""}{" "}
                {list[random[1]]?.lastname || ""}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Container>
    </div>
  );
}

export default Game;
