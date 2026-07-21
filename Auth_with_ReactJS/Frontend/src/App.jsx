import React from 'react'
import {Routes , Route} from 'react-router-dom' ; 
import ViewProducts from './pages/ViewProducts' ;
import RegisterUser from './pages/RegisterUser' ;
import  LoginUser from  './pages/LoginUser' ; 
import RegisterDev from './pages/RegisterDev';
import LoginDev from './pages/LoginDev' ; 
import AddProduct from './pages/AddProduct' ; 
const App = () => {
	return (
		<>
			<Routes>
				<Route path='/products' element={<ViewProducts/>} />
				<Route path='/register' element={<RegisterUser/>} />
				<Route path='/login' element={<LoginUser/>} />
				<Route path='/dev'>
					<Route path='register' element={<RegisterDev/>} />
					<Route path='login' element={<LoginDev/>} />
					<Route path='create-product' element={<AddProduct/>} />
				</Route>
			</Routes>
		</>
	)
}

export default App