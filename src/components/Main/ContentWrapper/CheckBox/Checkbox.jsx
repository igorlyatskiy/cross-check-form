import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { changePartialPoints, changeMarkType } from '../../../../redux/main/actions'

export default function CheckBox({ text, maxPoints, id }){
  const phrases = ['Не выполнено', 'Выполнено частично', 'Выполнено полностью']
  const [partialPoints, setPartialPoints] = useState((maxPoints/2).toFixed(0));
  const dispatch = useDispatch();
  const { types } = useSelector(state => state.mainReducer);

  const inputValue = types.find((type)=>type.id === id);
  const inputType = inputValue?.type;

  const setGlobalPartialPoints = (value) => {
    dispatch(changePartialPoints({id, value}))
    setPartialPoints(value);
  }

  const changeMarkTypeAction = (event, inputIndex) => {
    if(event.target.tagName === "INPUT") {
      dispatch(changeMarkType({id, type: inputIndex}))
    }
  }

  return <div className="checkbox-container">
    <div className="task-max-score">
      <span>Балл за выполнение</span>
      <p>{maxPoints}</p>
    </div>
    <div className="task-description">
      <p className="task-title">{text}</p>
      <a href="#" className="add-feedback">Добавить отзыв</a>
    </div>
    <div className="radio-group">
      {phrases.map((phrase, inputIndex)=>
        <label>
          {phrase}
          <input type="radio" name={id} checked={inputType === inputIndex} onChange={(event)=>changeMarkTypeAction(event, inputIndex)}/>
          <span className="checkmark"/>
          {inputIndex === 1 &&
          <input type='number' className="partial-points-input" value={partialPoints} min={1} max={maxPoints - 1} onChange={(event)=>setGlobalPartialPoints(event.target.value)}/>}
        </label>
      )}
    </div>
  </div>
}