import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { ToggleButton } from "@mui/material";

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export const StyledCard = styled("div")(({ theme }) => ({
  width: 300,
  height: 240,
  display: "inline-block",
  flexFlow: "row wrap",
  mr: 5,
  mt: 1,
  "&:hover": {
    boxShadow: "0px 5px 5px rgba(100, 100, 100, 0.5)",
    cursor: "pointer",
  },
}));

export const StyledCardBox = styled("div")(({ theme }) => ({
  display: "flex",
  flexFlow: "column",
  justifyContent: "space-between",
}));

export const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  borderRadius: "50px",
  padding: "5px 20px",
  fontWeight: 500,
}));
