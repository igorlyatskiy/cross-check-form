import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { changePartialPoints, changeMarkType, changeComments } from '../../../../redux/main/actions'

export default function CheckBox({ text, maxPoints, id }){
  const phrases = ['Не выполнено', 'Выполнено частично', 'Выполнено полностью']
  const [partialPoints, setPartialPoints] = useState(maxPoints/2);
  const dispatch = useDispatch();
  const { types, comments } = useSelector(state => state.mainReducer);
  const [isCommentInputVisible, setCommentInputVisibility] = useState(false);

  const inputValue = types.find((type)=>type.id === id);
  const inputType = inputValue?.type;

  const parialPointsInputClassName = inputType === 1 ? 'partial-points-input partial-points-input_active' : 'partial-points-input'

  const setGlobalPartialPoints = (value) => {
    if(value >= 0 && value <= maxPoints) {
      dispatch(changePartialPoints({id, value}))
      setPartialPoints(value);
    } else {
      const newValue = maxPoints/2;
      dispatch(changePartialPoints({id, newValue}))
      setPartialPoints(newValue);
    }
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
      <button className="add-feedback" onClick={(e)=>{e.preventDefault(); setCommentInputVisibility(!isCommentInputVisible)}}>{!isCommentInputVisible? 'Добавить отзыв': 'Скрыть отзыв'}</button>
      { isCommentInputVisible &&
        <div className="add-form">
          <textarea placeholder="Write your feedback here, it will be saved automatically."
            value={comments.find((comment)=>comment.id === id)?.value || ''}
            onInput={(event)=>dispatch(changeComments({id, value: event.target.value}))}/>
        </div> }
    </div>
    <div className="radio-group">
      {phrases.map((phrase, inputIndex)=>
        <label key={phrase}>
          {phrase}
          <input type="radio" name={id} checked={inputType === inputIndex} onChange={(event)=>changeMarkTypeAction(event, inputIndex)}/>
          <span className="checkmark"/>
          {inputIndex === 1 &&
          <input type='number' className={parialPointsInputClassName} value={partialPoints} step={1} min={1} max={maxPoints - 1} onChange={(event)=>setGlobalPartialPoints(event.target.value)}/>}
        </label>
      )}
    </div>
  </div>
}