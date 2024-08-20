import React from "react";
import * as XLSX from "xlsx/xlsx.mjs";
import { AiOutlineDownload } from "react-icons/ai";
import { Button } from "flowbite-react";
const DownloadBtn = ({ data = [], fileName }) => {
  return (
    <div
      className={`cursor-pointer flex justify-center rounded-md items-center px-5  gap-2 bg-dashboard-day  border-bg-day dark:border-extra-night  dark:bg-dashboard-night lg:w-64 w-32 py-3 duration-500   hover:shadow-md text-white`}
      onClick={() => {
        const datas = data?.length ? data : [];
        const sheet = XLSX.utils.json_to_sheet(datas);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, sheet, "Sheet1");
        XLSX.writeFile(workbook, fileName ? `${fileName}.xlsx` : "data.xlsx");
      }}
    >
      <AiOutlineDownload className="text-white mr-2 h-5 w-5" />
      Export
    </div>
  );
};

export default DownloadBtn;
