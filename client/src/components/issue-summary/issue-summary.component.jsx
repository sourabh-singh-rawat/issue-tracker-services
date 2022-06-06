import { Button, Card, CardContent, Grid, Typography } from "@mui/material";

const IssueSummary = () => {
  return (
    <Card
      variant="outlined"
      sx={{
        border: "2px solid",
        borderColor: "background.main3",
        borderRadius: 3,
        height: "300px",
      }}
    >
      <CardContent>
        <Grid container>
          <Grid item sx={{ flexGrow: 1 }}>
            <Typography
              variant="body1"
              sx={{ color: "primary.text2", fontWeight: "bold" }}
            >
              Issue Summary
            </Typography>
          </Grid>
          <Grid item>
            <Button
              sx={{ textTransform: "none", backgroundColor: "background.main" }}
            >
              View All
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default IssueSummary;
