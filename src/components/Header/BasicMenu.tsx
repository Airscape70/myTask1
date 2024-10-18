import * as React from "react";
import { IProject } from "../../interfaces/IProject";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { Box } from "@mui/material";
import { DataContext } from "../../providers/DataProvider";



export default function BasicMenu() {

  const { projects, setSelectedProject, currentProject } = React.useContext(DataContext);

  const handleProjectClick = (project: IProject) => {
    setSelectedProject(project);
    currentProject(project)
  };

  return (
    <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
      <PopupState  variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <React.Fragment>
            <Button variant="contained" {...bindTrigger(popupState)}>
              Menu
            </Button>
  
            <Menu {...bindMenu(popupState)}>
              {projects?.map((el) => (
                <MenuItem
                  key={el.projectId}
                  onClick={() => handleProjectClick(el)}
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
