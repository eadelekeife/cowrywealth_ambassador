import 'antd/dist/antd.css';
import './assets/css/index.css';

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


// events
import NewEvent from './components/events/newEvents';
import NewEventCategory from './components/admin/Events/addcategory.js';
import AllEventCategories from './components/admin/Events/allcategories.js';
import AllEvents from './components/events/allEvents';
import VisibleEvents from './components/events/visibleEvents';
import HiddenEvents from './components/events/hiddenEvents';
import EditEvents from './components/events/editEvents';
import EditEvent from './components/events/edit';
import SingleEvent from './components/events/singleEvent';

// communities
import AllCommunity from './components/communities/allCommunities';
import NewCommunity from './components/communities/newCommunities';
import NewCommunityCategories from './components/admin/Communities/addcategory';
import AllCommunityCategories from './components/admin/Communities/allcategory';
import CommunityMembers from './components/communities/communitymembers';
import CommunityMemberDetails from './components/communities/members';
import HiddenCommunities from './components/communities/hiddenCommunities';
import EditCommunities from './components/communities/editCommunities';

// businesses
import AllBusiness from './components/businesses/allBusinesses';
import NewBusiness from './components/businesses/newBusiness';
import NewBusinessesCategories from './components/admin/businesses/addcategory';
import AllBusinessesCategories from './components/admin/businesses/allcategory';
import HiddenBusinesses from './components/businesses/hiddenbusiness';
import VisibleBusinesses from './components/businesses/hiddenbusiness';
import EditBusinesses from './components/businesses/editbusiness';

// auth
import SignIn from './components/authorization/signin';
import SetPassword from './components/authorization/setPassword';
import SignOut from './components/authorization/signout';
import Dashboard from './components/authorization/dashboard';
import NewPassword from './components/authorization/newPassword';


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Dashboard />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/new_password" element={<NewPassword />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/set_password" element={<SetPassword />} />

                <Route path="/signout" element={<SignOut />} />
                <Route path="/events/all" element={<AllEvents />} />
                <Route path="/events/new" element={<NewEvent />} />
                <Route path="/events/hidden" element={<HiddenEvents />} />
                <Route path="/events/visible" element={<VisibleEvents />} />
                <Route path="/events/edit" element={<EditEvents />} />
                <Route path="/events/edit/:eventTitle/:eventId" element={<EditEvent />} />
                <Route path="/event/:eventTitle/:eventId" element={<SingleEvent />} />

                <Route path="/communities/all" element={<AllCommunity />} />
                <Route path="/communities/new" element={<NewCommunity />} />
                <Route path="/communities/hidden" element={<HiddenCommunities />} />
                <Route path="/communities/members" element={<CommunityMembers />} />
                <Route path="/communities/:name/:id" element={<CommunityMemberDetails />} />
                <Route path="/communities/edit" element={<EditCommunities />} />

                <Route path="/businesses/all" element={<AllBusiness />} />
                <Route path="/businesses/new" element={<NewBusiness />} />
                <Route path="/businesses/hidden" element={<HiddenBusinesses />} />
                <Route path="/businesses/visible" element={<VisibleBusinesses />} />
                <Route path="/businesses/edit" element={<EditBusinesses />} />


                <Route path="/event/categories/new" element={<NewEventCategory />} />
                <Route path="/event/categories/all" element={<AllEventCategories />} />

                <Route path="/communities/categories/new" element={<NewCommunityCategories />} />
                <Route path="/communities/categories/all" element={<AllCommunityCategories />} />

                <Route path="/businesses/categories/new" element={<NewBusinessesCategories />} />
                <Route path="/businesses/categories/all" element={<AllBusinessesCategories />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;

// ReactDOM.render(<App />, document.querySelector('#root'));