import { useMemo} from "react";
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from "material-react-table";
import { IReport } from "../../interfaces/IReport";


export default function Report({ report }: { report: IReport[] }) {
  // const [dataTable, setDataTable] = useState<IReport[]>([]);


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

  const table = useMaterialReactTable({
    columns,
    data: report, // this will already be filtered on the server
    manualFiltering: true, //turn off client-side filtering
    onColumnFiltersChange: (...args)=>{console.log(args[0])}, //hoist internal columnFilters state to your state
  });

  return (
      <MaterialReactTable
        table={table}
      />
  );
}
