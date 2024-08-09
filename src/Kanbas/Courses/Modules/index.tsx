import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import {BsGripVertical} from "react-icons/bs"
import { useParams } from "react-router";
import React, { useState, useEffect } from "react";
import * as client from "./clients";
import { setModules, addModule, deleteModule, updateModule, editModule } from "./modulesReducer";
import { useSelector, useDispatch } from "react-redux";

export default function Modules() {
  const { cid } = useParams();
  const dispatch = useDispatch(); 
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state:any) => state.modulesReducer);
  const fetchModules = async () => {
    const modules = await client.findModulesForCourse(cid as string);
    dispatch(setModules(modules));
  }
  const createModule = async (module: any) => {
    const newModule = await client.createModule(cid as string, module);
    dispatch(addModule(newModule));
  }

  const removeModule = async (moduleId: string) =>{
    await client.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  }

  const saveModule = async (module: any) => {
    const status = await client.updateModule(module);
    dispatch(updateModule(module));
  }
  useEffect(() => {
    fetchModules();
  }, []);

  const { currentUser } = useSelector((state:any) => state.accountReducer);
  return (
      <div>
        {currentUser.role==="FACULTY" &&
        <>
        <ModulesControls setModuleName={setModuleName} moduleName={moduleName} 
          addModule={()=>{
          createModule({name:moduleName, course: cid}); 
          setModuleName("");
          }}/><br /><br /><br /><br /> </>}
        {currentUser.role==="FACULTY" &&   
        <ul id="wd-modules" className="list-group rounded-0">
          {modules
            .filter((module: any) => module.course === cid)
            .map((module: any) => (
            <li className="wd-module  list-group-item p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />
                {!module.editing && module.name}
                {module.editing && (
                  <input className="form-control w-50 d-inline-block"
                         onChange={(e) => saveModule({...module, name: e.target.value})}
                         onKeyDown={(e) => {
                         if (e.key === "Enter") {
                            saveModule({ ...module, editing: false });
                          }
                         }} 
                         value={module.name}/>
                )}
                <ModuleControlButtons moduleId={module._id} deleteModule={(moduleId) => {removeModule(moduleId);}}
                 editModule={(moduleId) => dispatch(editModule(moduleId))}/>  
              </div>
              {module.lessons && (
                <ul className="wd-lessons list-group rounded-0">
                  {module.lessons.map((lesson: any) => (
                    <li className="wd-lesson list-group-item p-3 ps-1 border-left">
                      <BsGripVertical className="me-2 fs-3" />
                      {lesson.name}
                      <LessonControlButtons />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
       </ul>
       }
       {currentUser.role==="STUDENT" &&
        <ul id="wd-modules" className="list-group rounded-0">
        {modules
          .filter((module: any) => module.course === cid)
          .map((module: any) => (
          <li className="wd-module  list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              {module.name}
            </div>
            {module.lessons && (
              <ul className="wd-lessons list-group rounded-0">
                {module.lessons.map((lesson: any) => (
                  <li className="wd-lesson list-group-item p-3 ps-1 border-left">
                    <BsGripVertical className="me-2 fs-3" />
                    {lesson.name}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
     </ul>
        }
     </div>
);}
