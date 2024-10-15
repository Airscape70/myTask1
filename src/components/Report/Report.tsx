import { useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { IReport } from "../../interfaces/IReport";
import { Box, Chip, Stack, Typography } from "@mui/material";
import { reportsTypeFilters } from "../../constants/constants";

export default function Report({ report }: { report?: IReport[] }) {
  const [repo, setRepo] = useState<IReport[] | undefined>([]);

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

  const handleOnTypeFilter = (alias: string) => {
    setRepo(report);
    setRepo(repo?.filter((rep) => rep.reportAlias === alias));
  };
  const handleDeleteTypeFilter = () => {
    setRepo(report);
  };

  useEffect(() => {
    setRepo(report);
  }, [report, setRepo]);

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
              onClick={() => handleOnTypeFilter(filter.alias)}
              onDelete={() => handleDeleteTypeFilter()}
              size="small"
            />
          ))}
        </Stack>
      </Box>

      <MaterialReactTable
        columns={columns}
        data={repo!}
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
