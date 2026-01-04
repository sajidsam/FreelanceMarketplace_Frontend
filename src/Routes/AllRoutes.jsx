import React from 'react';
import { Route, Routes } from 'react-router';
import Home from '../Pages/Home';
import AddTask from '../Pages/AddTask';
import BrowseTask from '../Pages/BrowseTask';
import MyTask from '../Pages/MyTask';
import Layout from '../Layout/Layout';

const AllRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index path='/' element={<Home />}></Route>
                <Route path='/add-task' element={<AddTask />}></Route>
                <Route path='/browse-tasks' element={<BrowseTask />}></Route>
                <Route path='/my-tasks' element={<MyTask />}></Route>
            </Route>
        </Routes>
    );
};

export default AllRoutes;