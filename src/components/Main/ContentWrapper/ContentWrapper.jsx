import React from "react";
import { useSelector, useDispatch } from 'react-redux';

import CheckBox from "./CheckBox/Checkbox";
import Title from "./Title/Title";
import { toggleInfo } from "../../../redux/main/actions";


export default function ContentWrapper(){
  const { criteria } = useSelector(state => state.mainReducer);
  const dispatch = useDispatch()

  return <div className="content-wrapper">
    <section className="criteria-list">
      <form>
        {
          criteria.map((item)=>{
            if(item.type === 'title') return <Title key={item.id} title={item.title}/>
            if(item.type === 'subtask') return <CheckBox key={item.id} text={item.text} maxPoints={item.max} id={item.id}/>
            return <div>Unexpected error</div>
          })
        }
      </form>
    </section>
    <div className="feedback">
      <button onClick={()=>dispatch(toggleInfo())}>Показать отзыв</button>
    </div>
  </div>
}