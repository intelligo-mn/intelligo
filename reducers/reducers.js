import { combineReducers } from 'redux'
import { PRO_ADD } from '../actions/actions'

function pro(state, action) {
   switch (action.type) {
	
      case PRO_ADD:
         return {
            id: action.id,
            text: action.text,
         }
			
      default:
      return state
   }
}

function pros(state = [], action) {
   switch (action.type) {
	
      case PRO_ADD:
         return [
            ...state,
            pro(undefined, action)
         ]
			
      default:
      return state
   }
}

const proApp = combineReducers({
   pros
})

export default proApp