import React from "react";
import { useSelector, useDispatch } from "react-redux";

import getTotalScore from "../Header/Score/getTotalScore";
import { toggleInfo } from "../../redux/main/actions";
import UseResponse from "./hooks/UseResponse";
import UseCriteria from "./hooks/UseCriteria";

export default function Info(){
  const { feedback, types, criteria, partialPoints, comments } = useSelector(state => state.mainReducer);
  const dispatch = useDispatch()
  const filteredCriteria = criteria.filter((item)=>item.type === 'subtask')
  const [wrongCriteria, partialCriteria, correctCriteria] = UseCriteria(types, filteredCriteria);

  const score = getTotalScore(types, criteria, partialPoints)
  const response = UseResponse(score, comments, wrongCriteria, partialCriteria, correctCriteria, partialPoints)


  const isVisible = feedback.isFeedbackVisible
  const blockClassName = isVisible ? 'info visible' : 'info'

  const areAllPointsChecked = types.length === filteredCriteria.length

  return <div className={blockClassName}>
    {isVisible &&
    <>
      <div className="header"><p className="close" onClick={()=>dispatch(toggleInfo())}>×</p></div>

    {
      areAllPointsChecked ?
      <>
        <div className="content">
          <p><strong>Ваша отметка - {score} балла(ов)</strong></p>
        </div>
        <p>Отзыв по пункам ТЗ: </p>

        {  wrongCriteria.length && <p><strong>Не выполненные/не засчитанные пункты: </strong></p>  }
        {
          wrongCriteria.map((wrong, index)=><React.Fragment key={wrong.id}>
              <p>{index+1}&#41; {wrong.text}</p>
              {comments.find((comment)=>comment.id===wrong.id) &&
                <p>Комментарий проверяющего: <strong>{comments.find((comment)=>comment.id===wrong.id).value}</strong> </p>
              }
            </React.Fragment>
          )
        }

        {partialCriteria.length && <p><strong>Частично выполненные пункты: </strong></p>}
        {
          partialCriteria.map((partial, index)=><React.Fragment key={partial.id}>
          <p>{index+1}&#41; {partial.text} —&nbsp;
            <em>
              {partialPoints.find((partialPoint)=>partial.id === partialPoint.id)?.value || Math.floor(partial.max/2)} балл(а)
            </em>
          </p>
          {comments.find((comment)=>comment.id===partial.id) &&
            <p>Комментарий проверяющего: <strong>{comments.find((comment)=>comment.id===partial.id).value}</strong> </p>
          }
          </React.Fragment>)
        }

        { correctCriteria.length && <p><strong>Выполненные пункты:</strong></p> }
        {
          correctCriteria.map((correct, index)=><React.Fragment key={correct.id}>
            <p>{index+1}&#41; {correct.text}</p>
            {comments.find((comment)=>comment.id===correct.id) &&
              <p>Комментарий проверяющего: <strong>{comments.find((comment)=>comment.id===correct.id).value}</strong> </p>
            }
          </React.Fragment>)
        }


        <div className="copy">
          <span onClick={()=>navigator.clipboard.writeText(response)}>Скопировать в буфер</span>
        </div>
      </>: <p><strong>Вы проверили не все пункты задания</strong></p>
    }
    </>}
  </div>
}