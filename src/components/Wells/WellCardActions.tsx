import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function WellCardActions() {
  return (
    <>
      <CardActions
        sx={{
          display: "flex",
          flexFlow: "row wrap",
          pl: "16px"
        }}
      >
        <Stack direction="row" spacing={2}>
          <Button sx={{ borderRadius: "50px"}} size="medium" variant="outlined">
            БУР
          </Button>
          <Button sx={{ borderRadius: "50px" }} size="medium" variant="outlined">
            ВМР
          </Button>
          <Button sx={{ borderRadius: "50px" }} size="medium" variant="outlined">
            ОСВ
          </Button>
        </Stack>
      </CardActions>

      <CardActions>
        <Stack direction="row" spacing={1} >
          <Button size="small" variant="text">
            План
          </Button>
          <Button size="small" variant="text">
            Все отчеты
          </Button>
        </Stack>
      </CardActions>
    </>
  );
}
