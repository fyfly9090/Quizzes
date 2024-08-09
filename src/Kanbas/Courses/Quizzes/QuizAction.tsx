import { FC, useRef } from 'react';
import useOnClickOutside  from './useOnClickOutside'; 
import { Link, useParams } from 'react-router-dom';
import { deleteQuiz, updateQuiz } from './quizzesReducer';
import { useDispatch, useSelector } from 'react-redux';
import * as client from "./client";

interface QuizActionProps {
    x: number,
    y: number,
    closeContextMenu: () => void,
    quizId: string,
    courseId: string,
}

const QuizAction: FC<QuizActionProps> = ({x, y, closeContextMenu, quizId, courseId}) => {
    const contextMenuRef =useRef<HTMLDivElement>(null)
    useOnClickOutside(contextMenuRef, closeContextMenu)
    const { quizzes } = useSelector((state:any)=>state.quizzesReducer);
    const currentQuiz = quizzes.find((q:any)=> q._id===quizId);
    const dispatch = useDispatch();

    
    const removeQuiz = async(quizId:string)=>{
      await client.deleteQuiz(quizId);
      dispatch(deleteQuiz(quizId));
    }

    const saveQuiz = async(quiz:any) => {
      const status = await client.updateQuiz(quiz);
      dispatch(updateQuiz(quiz));
  }
   
    return (
        <div ref={contextMenuRef}
            onClick={()=> closeContextMenu()} className='absolute-position' style={{top: `${y-5}px`, left:`${x+5}px`}}>
            <ul className='list-group context-menu-style'>
                <li className='list-group-item'>
                  <Link key={quizId} to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`} className='text-decoration-none text-dark'>
                    Edit
                  </Link>  
                </li>
                <li className='list-group-item' onClick={() => removeQuiz(quizId)}>
                  Delete
                </li> 
                <li className='list-group-item' onClick={()=> saveQuiz({...currentQuiz, publish:currentQuiz.publish===false?true:false})}>
                {currentQuiz.publish? "Unpublish":"Publish"}
                </li>           
            </ul>    
        </div>
    )
}

export default QuizAction


