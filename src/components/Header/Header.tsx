import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { IProject } from "../../interfaces/IProject";
import BasicMenu from "./BasicMenu";
import { Search, SearchIconWrapper, StyledInputBase } from "./muiComponentsStyled/componentStyled";

const navItems:string[] = ["Home", "About", "Contact"];

interface IHeaderProps {
  data: IProject[];
  onProjectClick: (event: IProject) => void;
};

export default function Header(props: IHeaderProps) {
  return (
    <AppBar position="static">
      <Toolbar>
        <BasicMenu
          data={props.data}
          onProjectClick={props.onProjectClick}
        />

        <Box sx={{ xs: "none", sm: "block" }}>
          {navItems.map((item) => (
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
