import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import BasicMenu from "./BasicMenu";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../styles";
import { NAV_ITEMS } from "../../constants/constants";

export default function Header() {

  return (
    <AppBar position="static">
      <Toolbar>
        <BasicMenu />

        <Box sx={{ xs: "none", sm: "block" }}>
          {NAV_ITEMS.map((item) => (
            <Button key={item} sx={{ color: "#fff" }}>
              {item}
            </Button>
          ))}
        </Box>

        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </Toolbar>
    </AppBar>
  );
}
