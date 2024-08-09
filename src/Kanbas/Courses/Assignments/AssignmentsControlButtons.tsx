import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import {BsPlus} from "react-icons/bs"

export default function AssignmentsControlButtons() {
  return (
    <div className="float-end">
      <button type="button" className="bg-gray wd-rounded-corners-all-around">
        40% of Total
      </button>
      <BsPlus className="fs-4" />
      <IoEllipsisVertical className="fs-4" />
    </div>
);}