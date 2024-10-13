import { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { IReport } from "../../interfaces/IReport";
import { Typography } from "@mui/material";

export default function Report({ report }: { report: IReport[] }) {
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

  return (
    <>
      <Typography variant="h4" my="10px" color="primary">
        Отчеты
      </Typography>
      <MaterialReactTable
        columns={columns}
        data={report}
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
