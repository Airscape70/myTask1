import { Box } from "@mui/material";
import Header from "../components/Header/Header";
import Report from "../components/Report/Report";
import Wells from "../components/Wells/Wells";
import { useProjects } from "../hooks/useProjects";
import { useCallback, useEffect } from "react";
import { useSites } from "../hooks/useSites";
import { useWells } from "../hooks/useWells";
import { useEvents } from "../hooks/useEvents";
import { useReport } from "../hooks/useReport";

export default function HomePage() {
  const { loadProjects } = useProjects();
  const { loadSites } = useSites();
  const { loadWells } = useWells();
  const { loadEvents } = useEvents();
  const { loadReport } = useReport();

  const load = useCallback(async () => {
    await loadProjects();
    await loadSites();
    await loadWells();
    await loadEvents();
    await loadReport();
  }, [loadProjects, loadSites, loadWells, loadEvents, loadReport]);

  useEffect(() => {
    load();
  }, [load]);

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
