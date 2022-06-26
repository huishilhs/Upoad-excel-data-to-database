import React from "react";

export const IndividualData = ({ individualExcelData }) => {
  return (
    <>
      <th>{individualExcelData.TenderNo}</th>
      <th>{individualExcelData.AccountLevel}</th>
      <th>{individualExcelData.ParentAgency}</th>
      <th>{individualExcelData.Agency}</th>
      <th>{individualExcelData.PublishedDate}</th>
      <th>{individualExcelData.PlannedCloseDate}</th>
      <th>{individualExcelData.ExtendedCloseDate}</th>
    </>
  );
};
