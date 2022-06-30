import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { Data } from "./Data";
import { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

function tempAlert(msg, duration) {
  var el = document.createElement("div");
  el.setAttribute(
    "style",
    "position:absolute;top:40%;left:40%;background-color:white;color:red;"
  );
  el.innerHTML = msg;
  setTimeout(function () {
    el.parentNode.removeChild(el);
  }, duration);
  document.body.appendChild(el);
}

function tempAlertSuccess(msg, duration) {
  var el = document.createElement("div");
  el.setAttribute(
    "style",
    "position:absolute;top:40%;left:44%;background-color:white;color:red;"
  );
  el.innerHTML = msg;
  setTimeout(function () {
    el.parentNode.removeChild(el);
  }, duration);
  document.body.appendChild(el);
}

function App() {
  // on change states
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);

  // submit
  const [excelData, setExcelData] = useState(null);
  // it will contain array of objects

  // handle File
  const fileType = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];
  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      console.log(selectedFile.type);
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFileError(null);
          setExcelFile(e.target.result);
        };
      } else {
        setExcelFileError("Please select only excel file types");
        setExcelFile(null);
      }
    } else {
      console.log("please select your file");
    }
  };

  // submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      axios
        .post(`http://localhost:8081/upload/excel`, data)
        .then((response) => {
          tempAlertSuccess("Upload successful!", 10000);
        })
        .catch((error) => {
          console.log(error);
          tempAlert("Upload unsuccessful, please try again", 5000);
        });

      setExcelData(data);
    } else {
      setExcelData(null);
    }
  };

  return (
    <div className="container">
      {/* upload file section */}
      <div className="form">
        <form className="form-group" autoComplete="off" onSubmit={handleSubmit}>
          <label
            style={{
              marginBottom: 30 + "px",
              marginLeft: 500,
              marginTop: 30 + "px",
              fontFamily: "fantasy",
            }}
          >
            <h1>Upload Excel file</h1>
          </label>
          <br></br>
          <input
            type="file"
            className="form-control"
            onChange={handleFile}
            required
          ></input>
          {excelFileError && (
            <div className="text-danger" style={{ marginTop: 30 + "px" }}>
              {excelFileError}
            </div>
          )}
          <button
            type="submit"
            className="btn btn-success"
            style={{
              marginTop: 30 + "px",
              marginLeft: 560,
              backgroundColor: "purple",
              paddingLeft: 40,
              paddingRight: 40,
              paddingBottom: 15,
              paddingTop: 15,
              fontSize: 18,
            }}
          >
            Upload
          </button>
        </form>
      </div>

      <br></br>
      <hr></hr>

      {/* view file section */}
      <h5>View Excel file</h5>
      <div className="viewer">
        {excelData === null && <>No file selected</>}
        {excelData !== null && (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name of Opportunity</th>
                  <th scope="col">Tender No.</th>
                  <th scope="col">H&amp;PS Account Level</th>
                  <th scope="col">Parent Agency &#40;Ministry Level&#41;</th>
                  <th scope="col">Agency</th>
                  <th scope="col">Published Date</th>
                  <th scope="col">Planned Close Date</th>
                  <th scope="col">Extended Close Date</th>
                </tr>
              </thead>
              <tbody>
                <Data excelData={excelData} />
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
