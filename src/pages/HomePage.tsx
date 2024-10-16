import { Box } from "@mui/material";
import Header from "../components/Header/Header";
import Report from "../components/Report/Report";
import Wells from "../components/Wells/Wells";
import { useContext } from "react";
import { DataContext, DataProvider } from "../providers/DataProvider";


function HomeContent() {
  const { selectedProject } = useContext(DataContext);
  return (
    <>
      <Header />
      {selectedProject && (
        <Box mx="50px">
          <Wells />
          <Report />
        </Box>
      )}
    </>
  );
}

export default function HomePage() {
  return (
    <DataProvider>
      <HomeContent />
    </DataProvider>
  );
}
