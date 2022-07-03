import React from "react";

export const DataHeader = ({ excelData }) => {
  return Object.keys(excelData).map((keyName, keyIndex) => (
    <th key={keyIndex}>{keyName}</th>
  ));
};
