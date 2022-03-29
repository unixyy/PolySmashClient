import "./Home.css";
import { Box, Container, Typography } from "@mui/material";

function Home() {
  return (
    <Box
      sx={{
        width: "100%",
        position: "center",
        maxWidth: 700,
        m: "auto",
        mb: "45vh",
        mt: "5vh",
      }}
    >
      <Typography variant="h1" gutterBottom>
        PolySmash
      </Typography>
      <Typography variant="body1" gutterBottom>
        This site has been made with the idea to re-implement the FaceSmash done
        by Mark Zuckerberg during his years in Harvard.
      </Typography>
      <Typography variant="body1" gutterBottom class="typo">
        It features the game, where you have to choose between two people, a
        News page and a Suggestions page, as well as the pages ready for the
        login and registering of users.
      </Typography>
    </Box>
  );
}

export default Home;
