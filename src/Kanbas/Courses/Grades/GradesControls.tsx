import { FaFileImport, FaFileExport } from "react-icons/fa6";
import { IoMdSettings, IoIosArrowDown } from "react-icons/io";

export default function GradesControls() {
    return (
        <div id="wd-grades-controls" className="text-nowrap lowest-width">
          <button id="wd-setting-btn" className="btn btn-lg btn-grade-style me-0 ms-1 float-end">
            <IoMdSettings className="position-relative mx-1" style={{ bottom: "1px" }}/>
          </button>
          <button id="wd-import-grade-btn" className="btn btn-lg btn-grade-style mx-1 float-end">
            <FaFileExport className="position-relative mx-2" style={{ bottom: "1px" }}/>  
            Export
            <IoIosArrowDown className="position-relative mx-2" style={{ bottom: "1px" }}/>
          </button>
          <button id="wd-import-grade-btn" className="btn btn-lg btn-grade-style mx-1 pe-3 float-end">
            <FaFileImport className="position-relative mx-2" style={{ bottom: "1px" }}/>  
            Import
          </button>
        </div>
    )
}