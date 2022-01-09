import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { clearMarkType } from '../../../redux/main/actions'
import getTotalScore from "./getTotalScore";

export default function Score(){
  const { types, criteria, partialPoints } = useSelector(state => state.mainReducer);
  const dispatch = useDispatch()

  const filteredCriteria = criteria.filter((item)=>item.type === 'subtask')
  const score = getTotalScore(types, criteria, partialPoints)

  return <div className="score-title">
    <div className="progress">
      Проверено <span className="done">{types.length}</span> из <span className="total">{filteredCriteria.length}</span>
    </div>
    <button className="reset" onClick={()=>dispatch(clearMarkType())}>Сбросить</button>
    Total points: <span className="score-board">{score}</span>
  </div>
}