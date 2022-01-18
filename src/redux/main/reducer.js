import { createReducer } from "@reduxjs/toolkit";

import { changeComments, changeMarkType, changePartialPoints, clearMarkType, toggleInfo } from "./actions";
import { crossCheckCriteria, taskName } from '../../Constants'

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
  },
  comments: []
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
    state.types = [];
    state.partialPoints = [];
    state.comments = [];

  },
  [toggleInfo]: (state) => {
    state.feedback.isFeedbackVisible = !state.feedback.isFeedbackVisible
  },
  [changeComments]: (state, { payload }) => {
    if (state.comments.find((item) => item.id === payload.id)) {
      state.comments = [...state.comments.filter((item) => item.id !== payload.id), { id: payload.id, value: payload.value }]
    } else {
      state.comments.push({
        id: payload.id, value: payload.value
      })
    }
  }
})

export default mainReducer;