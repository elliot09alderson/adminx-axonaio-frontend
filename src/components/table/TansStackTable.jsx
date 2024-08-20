import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { AiOutlineSearch } from "react-icons/ai";

import DownloadBtn from "./DownloadBtn";
import DebouncedInput from "./DebouncedInput";
import { useEffect, useState } from "react";

// btn obj takes name as name & function as func
const TanStackTable = ({
  headers,
  data,
  btnObj,
  successMessage,
  component,
  clearMessage,
  ...props
}) => {
  console.log("table re-rendered");
  // ------------------------------- OLD CODE --------------------------------

  // ------------------------------- OLD CODE --------------------------------
  const columns = [
    {
      header: "SNO",
      accessorKey: "",
      cell: (info) => <span>{info.row.index + 1}</span>,
    },
    ...headers,
  ];
  // ------------------------------- USE EFFECT --------------------------------

  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({});

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // -------------------------------------------------------------------------------

  return (
    <div className={`sm:p-2 p-1    max-w-full text-day-light   mt-2`}>
      <div className=" flex flex-col sm:flex-row w-full justify-between ">
        <div className="ml-2   dark:bg-dashboard-night w-full flex lg:flex-row flex-col  justify-between  items-center  gap-4">
          {/* Search box */}
          <div className="flex items-center justify-center shadow-sm gap-2  px-2 my-2 bg-day dark:bg-night rounded-md">
            <AiOutlineSearch size={30} />

            <DebouncedInput
              value={globalFilter ?? ""}
              onChange={(value) => setGlobalFilter(String(value))}
              className="py-2 bg-day text-day-light outline-none w-[200px]  dark:bg-night md:focus:w-[400px] transition-all   font-medium duration-300 ease-out border-gray-400 pl-2  "
              placeholder="Filter Users ... "
            />
          </div>
          {/* FOR Custom Page Input */}
          <div className="flex gap-2  w-full  items-center justify-center">
            <span className="flex items-center gap-1 ml-4 text-white ">
              Go to page:
            </span>
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              placeholder="..."
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className=" font-medium outline-none   dark:bg-night border-none  rounded-lg  focus:outline-none pl-2  h-10   w-12 "
            />
          </div>
          {/* Data must be an array of objects */}
          <div className="flex sm:gap-8  gap-2 ">
            {btnObj && (
              <div
                onClick={btnObj.func}
                className="py-2 cursor-pointer sm:w-40 w-auto  rounded-lg px-5"
              >
                <button type="button" className="text-center">
                  {btnObj.name}
                </button>
              </div>
            )}

            {component && component}
            <DownloadBtn data={data} fileName={"data"} />
          </div>
        </div>
      </div>

      <div className=" overflow-x-auto mx-auto mt-4">
        <div className="flex gap-2 text-day justify-center flex-wrap p-2">
          {table.getAllColumns().map((column) => (
            <div key={column.id} className="flex items-center  mt-2 mx-2">
              <input
                type="checkbox"
                className="rounded-full bg-dashboard-day  "
                onChange={column.getToggleVisibilityHandler()}
                checked={column.getIsVisible()}
              />
              <span className=" px-2">{column.columnDef.header}</span>
            </div>
          ))}
        </div>
        <table className=" w-full bg-dashboard-day text-white  mt-4 rounded-lg md:border-spacing-4   ">
          <thead className=" rounded-t-sm bg-day dark:bg-night shadow-md  select-none ">
            {table.getHeaderGroups().map((headergroup, idx) => (
              <tr key={idx} className=" rounded-lg ">
                {headergroup.headers.map((header, idx) => (
                  <th
                    key={idx + 12}
                    className="capitalize truncate hover:text-clip  sm:text-base text-xs tracking-tight font-light  sm:px-3.5 px-1 py-2 sm:py-2 lg:py-3 md:px-4 lg:text-lg tracking-wider"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="rounded-lg dark:bg-night">
            {table.getRowModel().rows.length
              ? table.getRowModel().rows.map((row, i) => (
                  <tr
                    key={i + row.id}
                    className={`${
                      i % 2 === 0 ? "" : ""
                    }  mb-3 rounded-lg   bg-white border `}
                    style={{ borderSpacing: "5em" }}
                  >
                    {row.getVisibleCells().map((cell, i) => (
                      <td
                        key={cell.id + i}
                        className="sm:py-4 py-2 truncate hover:text-clip px-4 bg-white my-2  text-xs sm:text-sm md:text-base  "
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>

      {/* pagination */}

      <div className="flex sm:flex-row flex-col text-[#a0aeca] items-center my-4   justify-end sm:mr-1  gap-2">
        <div className="flex gap-2">
          <button
            className="p-1 border border-gray-300 px-2 disabled:opacity-30 rounded-md"
            disabled={!table.getCanPreviousPage()}
            onClick={() => {
              table.previousPage();
            }}
          >
            {"<"}
          </button>
          <button
            className="p-1 border  rounded-md border-gray-300 px-2 disabled:opacity-30"
            disabled={!table.getCanNextPage()}
            onClick={() => {
              table.nextPage();
            }}
          >
            {">"}
          </button>
        </div>
        {/* >>>>>>>>>>>>>>>>>>>>>>> */}

        {/* Display Page Number */}
        <div className="flex">
          <span className="flex items-center gap-1">
            <div>Page</div>
            {/* <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {successMessage &&
                Math.floor(
                  Number(data[0].count) /
                    Number(table.getState().pagination.pageSize)
                ) + 1}
            </strong> */}
          </span>
          {/* >>>>>>>>>>>>>>>>>>>>>>> */}
        </div>

        {/* >>>>>>>>>>>>>>>>>>>>>>> */}

        <div className="flex  gap-4 items-center justify-center">
          {/* DROPDOWN for selecting custom entries  */}
          <select
            name=""
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="p-2 bg-white outline-none border  gap-2 rounded-md"
            id=""
          >
            {[10, 20, 30, 50].map((pageSize, idx) => (
              <option key={pageSize + idx} className="" value={pageSize}>
                show {pageSize}
              </option>
            ))}
          </select>
        </div>
        {/* >>>>>>>>>>>>>>>>>>>>>>> */}
      </div>
    </div>
  );
};

export default TanStackTable;
