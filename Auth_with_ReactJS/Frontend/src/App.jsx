import React from 'react'
import {Routes , Route} from 'react-router-dom' ; 
import ViewProducts from './pages/ViewProducts' ;
import RegisterUser from './pages/RegisterUser' ;
import  LoginUser from  './pages/LoginUser' ; 
const App = () => {
	return (
		<>
			<Routes>
				<Route path='/products' element={<ViewProducts/>} />
				<Route path='/register' element={<RegisterUser/>} />
				<Route path='/login' element={<LoginUser/>} />
			</Routes>
		</>
	)
}

export default App