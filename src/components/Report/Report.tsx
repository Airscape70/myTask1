import { useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { IReport } from "../../interfaces/IReport";
import { Box, Chip, Stack, Typography } from "@mui/material";
import { reportsTypeFilters } from "../../constants/constants";
import { useStoreFilters, useStoreReport } from "../../store/store";
import { useShallow } from "zustand/react/shallow";

export default function Report() {
  const report = useStoreReport((state) => state.report);
  const { plan, filterType, addFilterType, clearFilterType } = useStoreFilters(
    useShallow((state) => ({
      plan: state.plan,
      filterType: state.filterType,
      addFilterType: state.addFilterType,
      clearFilterType: state.clearFilterType,
    }))
  );

  const [filteredReport, setFilteredReport] = useState<IReport[] | undefined>([]);

  const columns = useMemo(
    () => [
      { accessorKey: "entityType", header: "Тип" },
      { accessorKey: "dateReport", header: "Дата" },
      { accessorKey: "reportNo", header: "№" },
      { accessorKey: "description", header: "Описание" },
      { accessorKey: "eventCode", header: "Мероприятие" },
    ],
    []
  );

  const reportFilteredPlan = report?.filter((el) => el.reportAlias === plan[0]);

  const handleOnClickFilter = (alias: string) => {
    addFilterType(alias);
    setFilteredReport(report?.filter((rep) => rep.reportAlias === alias));
  };

  const handleDeleteTypeFilter = () => {
    setFilteredReport(report);
    clearFilterType();
  };

  useEffect(() => {
    setFilteredReport(report);
    handleDeleteTypeFilter()
  }, [report]);

  return (
    <>
      <Box display="inline-flex" pb="10px">
        <Typography variant="h5" color="primary" pr="20px">
          Отчеты
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          {reportsTypeFilters.map((filter) => (
            <Chip
              key={filter.alias}
              label={filter.type}
              onClick={() => handleOnClickFilter(filter.alias)}
              onDelete={() => handleDeleteTypeFilter()}
              size="small"
              autoCorrect="true"
              color={filterType === filter.alias ? "primary" : "default"}
            />
          ))}
        </Stack>
      </Box>
      <MaterialReactTable
        columns={columns}
        data={plan.length > 0 ? reportFilteredPlan : filteredReport!}
        enablePagination={true}
        enableSorting={true}
        enableColumnFilters={false}
        enableColumnActions={false}
        enableHiding={false}
        enableTopToolbar={false}
      />
    </>
  );
}
