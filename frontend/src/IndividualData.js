import React from "react";

export const IndividualData = ({ individualExcelData }) => {
  return (
    <>
      <th>{individualExcelData["Name of Opportunity"]}</th>
      <th>{individualExcelData["Tender No."]}</th>
      <th>{individualExcelData["H&PS Account Level"]}</th>
      <th>{individualExcelData["Parent Agency (Ministry Level)"]}</th>
      <th>{individualExcelData["Agency"]}</th>
      <th>{individualExcelData["Published Date"]}</th>
      <th>{individualExcelData["Planned Close Date"]}</th>
      <th>{individualExcelData["Extended Close Date"]}</th>
    </>
  );
};
