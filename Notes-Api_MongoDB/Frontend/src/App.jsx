import {Routes, Route, Link} from 'react-router-dom'
import Home from './pages/Home'
import GetNotes from './pages/GetNotes'
import NewForm from './pages/NewForm'
import ShowbyID from './pages/ShowbyID' ;
import DeletebyID from './pages/DeletebyID';
import EditForm from './pages/EditForm';

const App = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/notes' element={<GetNotes/>} />
                <Route path='/new' element={<NewForm/>} />
                <Route path='/notes/:id' element={<ShowbyID/>} />
                <Route path='/delete-notes/:id' element={<DeletebyID/>} />
                <Route path='/edit-notes/:id' element={<EditForm/>} />
            </Routes>
        </>
    )
}

export default App ;