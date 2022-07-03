import React from "react";

export const IndividualData = ({ individualExcelData }) => {
  return Object.keys(individualExcelData).map((keyName, keyIndex) => (
    <th key={keyIndex}>{individualExcelData[keyName]}</th>
  ));
};
