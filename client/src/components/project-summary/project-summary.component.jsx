import { useNavigate } from "react-router-dom";
import { Grid, Typography, Card, CardContent, Button } from "@mui/material";
import ProjectList from "../project-list/project-list.component";

const ProjectSummary = () => {
  const navigate = useNavigate();

  return (
    <Card
      variant="outlined"
      sx={{
        border: "2px solid",
        borderColor: "background.main3",
        backgroundColor: "background.main",
        borderRadius: 3,
        height: "300px",
      }}
    >
      <CardContent sx={{ height: "100%" }}>
        <Grid container>
          <Grid item sx={{ flexGrow: 1 }}>
            <Typography
              variant="body1"
              sx={{ color: "primary.text2", fontWeight: "bold" }}
            >
              Project Summary
            </Typography>
            <Typography variant="body2" sx={{ color: "background.main4" }}>
              These projects have most issues
            </Typography>
          </Grid>
          <Grid item>
            <Button
              sx={{
                textTransform: "none",
                backgroundColor: "background.main3",
                ":hover": {
                  color: "#ffffff",
                  backgroundColor: "primary.main",
                },
              }}
              onClick={() => {
                navigate("/projects");
              }}
            >
              View All
            </Button>
          </Grid>
        </Grid>

        <Grid item sm={12} height="100%">
          <ProjectList size={3} dashboard />
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProjectSummary;
