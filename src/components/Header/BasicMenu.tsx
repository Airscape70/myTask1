import * as React from "react";
import { IProject } from "../../interfaces/IProject";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { Box } from "@mui/material";

type BasicMenuProps = {
  data: IProject[];
  onProjectClick: (event: IProject) => void;
};

export default function BasicMenu(props: BasicMenuProps) {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
      <PopupState  variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <React.Fragment>
            <Button variant="contained" {...bindTrigger(popupState)}>
              Menu
            </Button>
  
            <Menu {...bindMenu(popupState)}>
              {props.data.map((el: IProject) => (
                <MenuItem
                  key={el.projectId}
                  onClick={() => props.onProjectClick(el)}
                >
                  {el.projectName}
                </MenuItem>
              ))}
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
    </Box>
  );
}
