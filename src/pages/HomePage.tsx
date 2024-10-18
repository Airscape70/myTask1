import { Box } from "@mui/material";
import Header from "../components/Header/Header";
import Report from "../components/Report/Report";
import Wells from "../components/Wells/Wells";
import { DataProvider } from "../providers/DataProvider";

function HomeContent() {


  return (
    <>
      <Header />
      <Box mx="50px">
        <Wells />
        <Report />
      </Box>
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
