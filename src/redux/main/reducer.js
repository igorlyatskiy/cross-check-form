import { createReducer } from "@reduxjs/toolkit";

import { changeMarkType, changePartialPoints, clearMarkType, toggleInfo } from "./actions";
import { crossCheckCriteria, taskName } from '../../components/Constants'

const criteriaWithIds = crossCheckCriteria.map((item, index) => ({
  ...item,
  id: index
}))

const defaultState = {
  criteria: criteriaWithIds,
  taskName,
  types: [],
  partialPoints: [],
  feedback: {
    isFeedbackVisible: false
  }
}

const mainReducer = createReducer(defaultState, {
  [changeMarkType]: (state, { payload }) => {
    if (state.types.find((item) => item.id === payload.id)) {
      state.types = [...state.types.filter((item) => item.id !== payload.id), { id: payload.id, type: +payload.type }]
    } else {
      state.types.push({
        id: payload.id, type: +payload.type
      })
    }
  },
  [changePartialPoints]: (state, { payload }) => {
    if (state.partialPoints.find((item) => item.id === payload.id)) {
      state.partialPoints = [...state.partialPoints.filter((item) => item.id !== payload.id), { id: payload.id, value: +payload.value }]
    } else {
      state.partialPoints.push({
        id: payload.id, value: +payload.value
      })
    }
  },
  [clearMarkType]: (state) => {
    state.types = []
  },
  [toggleInfo]: (state) => {
    state.feedback.isFeedbackVisible = !state.feedback.isFeedbackVisible
  }
})

export default mainReducer;