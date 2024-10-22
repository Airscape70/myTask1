import * as React from "react";
import { IProject } from "../../interfaces/IProject";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { Box } from "@mui/material";
import { useProjects } from "../../hooks/useProjects";
import { useStore } from "../../store/store";



export default function BasicMenu() {
  const {projects, setSelectedProject} = useStore()
  const {goToProject} = useProjects()

  const handleProjectClick = (project: IProject) => {
    setSelectedProject(project);
    goToProject(project)
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
