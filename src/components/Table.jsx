import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import useFetchData from "../hooks/useFetchData";

/*
email:"aaron@mailinator.com"
id:"1"
name:"Aaron Miles"
role:"member"
*/

const url =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

const Table = () => {
  const { data: usersData, isLoading, error } = useFetchData(url);
  const [data, setData] = useState(() => [...usersData]);
  const [originalData, setOriginalData] = useState(() => [...usersData]);
  const [editedRows, setEditedRows] = useState({});
  const [filtering, setFiltering] = useState("");


  const columns = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Role",
      accessorKey: "role",
    },
    {
      header: "Actions",
      accessorKey: "actions",
    },
  ];

  const table = useReactTable({
    data: usersData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filtering,
    },
    onGlobalFilterChange: setFiltering,
    meta: {
      editedRows,
      setEditedRows,
      revertData: (rowIndex, revert) => {
        if (revert) {
          setData((old) =>
            old.map((row, index) =>
              index === rowIndex ? originalData[rowIndex] : row
            )
          );
        } else {
          setOriginalData((old) =>
            old.map((row, index) => (index === rowIndex ? data[rowIndex] : row))
          );
        }
      },
      updateData: (rowIndex, columnId, value) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
  });

  if (isLoading) {
    return <p>Please wait while the data is being loaded...</p>;
  }

  if (error) {
    return (
      <p>
        Error while fetching data. Error:{error.message}. Developers check the
        console for more information.
      </p>
    );
  }

  return (
    <div>
      <h1>User Table</h1>
      <input
        type="search"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
      ></input>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <section>
        <div>
          Page{" "}
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </div>
        <button onClick={() => table.setPageIndex(0)}>First Page</button>
        <button
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          Previous Page
        </button>
        <button
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          Next Page
        </button>
        <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
          Last Page
        </button>
      </section>
    </div>
  );
};

export default Table;
