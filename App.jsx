import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPro } from './actions/actions'

import ProAdd from './components/ProAdd.jsx'
import ProList from './components/ProList.jsx'

class App extends Component {
   render() {
      const { dispatch, visibleTodos } = this.props
	
      return (
         <div>
			
            <ProAdd
               onAddClick = {text ⇒
               dispatch(addPro(text))}
            />
				
            <ProList pros = {visiblePros}/>
			
         </div>
      )
   }
}

function select(state) {
   return {
      visiblePros: state.pros
   }
}

export default connect(select)(App)