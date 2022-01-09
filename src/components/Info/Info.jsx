import React from "react";
import { useSelector, useDispatch } from "react-redux";

import getTotalScore from "../Header/Score/getTotalScore";
import { toggleInfo } from "../../redux/main/actions";

export default function Info(){
  const { feedback, types, criteria, partialPoints } = useSelector(state => state.mainReducer);
  const dispatch = useDispatch()

  const filteredCriteria = criteria.filter((item)=>item.type === 'subtask')

  const score = getTotalScore(types, criteria, partialPoints)

  const isVisible = feedback.isFeedbackVisible
  const blockClassName = isVisible ? 'info visible' : 'info'

  const wrongInputs = types.filter((e)=>e.type === 0);
  const wrongCriteria = filteredCriteria.filter((criteria)=>wrongInputs.find((input)=>input.id === criteria.id))

  const partialInputs = types.filter((e)=>e.type === 1);
  const partialCriteria = filteredCriteria.filter((criteria)=>partialInputs.find((input)=>input.id === criteria.id))

  const correctInputs = types.filter((e)=>e.type === 2);
  const correctCriteria = filteredCriteria.filter((criteria)=>correctInputs.find((input)=>input.id === criteria.id))

  const areAllPointsChecked = types.length === filteredCriteria.length


  let response = '';

  response += `Ваша отметка - ${score} балла(ов)\n`
  response += "Отзыв по пунктам ТЗ:\n"
  response += "Не выполненные/не засчитанные пункты:\n"
  wrongCriteria.forEach((wrong, index)=>{
    response += `${index+1}) ${wrong.text}\n`
  })
  response += "\nЧастично выполненные пункты:\n"
  partialCriteria.forEach((partial, index)=>{
    response += `${index+1}) ${partial.text} — `
    response += `${partialPoints.find((partialPoint)=>partial.id === partialPoint.id)?.value || Math.floor(partial.max/2)} балл(а)\n`
  })
  response += "\nВыполненные пункты:\n"
  correctCriteria.forEach((correct, index)=>{
    response += `${index+1}) ${correct.text}\n`
  })


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
          wrongCriteria.map((wrong, index)=><p>{index+1}&#41; {wrong.text}</p>)
        }

        {partialCriteria.length && <p><strong>Частично выполненные пункты: </strong></p>}
        {
          partialCriteria.map((partial, index)=><p>{index+1}&#41; {partial.text} —&nbsp;
          <em>
            {partialPoints.find((partialPoint)=>partial.id === partialPoint.id)?.value || Math.floor(partial.max/2)} балл(а)
          </em></p>)
        }

        { correctCriteria.length && <p><strong>Выполненные пункты:</strong></p> }
        {
          correctCriteria.map((correct, index)=><p>{index+1}&#41; {correct.text}</p>)
        }


        <div className="copy">
          <a href="#" onClick={()=>navigator.clipboard.writeText(response)}>Скопировать в буфер</a>
        </div>
      </>: <p><strong>Вы проверили не все пункты задания</strong></p>
    }
    </>}
  </div>
}