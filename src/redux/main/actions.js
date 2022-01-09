import { createAction } from "@reduxjs/toolkit"

export const CHANGE_MARK_TYPE = 'CHANGE_MARK_TYPE'
export const CHANGE_PARTIAL_POINTS = 'CHANGE_PARTIAL_POINTS'
export const CLEAR_MARK_TYPE = 'CLEAR_MARK_TYPE'
export const TOGGLE_INFO = 'TOGGLE_INFO'
export const CHANGE_COMMENT = 'CHANGE_COMMENT'

export const changeMarkType = createAction(CHANGE_MARK_TYPE)
export const changePartialPoints = createAction(CHANGE_PARTIAL_POINTS)
export const clearMarkType = createAction(CLEAR_MARK_TYPE)
export const toggleInfo = createAction(TOGGLE_INFO)
export const changeComments = createAction(CHANGE_COMMENT)