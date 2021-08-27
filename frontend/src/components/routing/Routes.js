import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Dashboard from '../dashboard/Dashboard';
import Alert from '../layout/Alert';
import NotFound from '../layout/NotFound';
import Settings from '../layout/Settings';
import Post from '../post/Post';
import PostForm from '../posts/PostForm';
import Posts from '../posts/Posts';
import ProfileForm from '../profile-forms/ProfileForm';
import Profile from '../profile/Profile';
import Profiles from '../Profiles/Profiles';
import SearchAlbum from '../search/SearchAlbum';
import SearchArtists from '../search/SearchArtists';
import SearchTracks from '../search/SearchTracks';
import PrivateRoute from './PrivateRoute';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/profile/:id' component={Profile} />
        <PrivateRoute
          exact
          path='/dashboard'
          name='Dashboard'
          component={Dashboard}
        />
        <Route exact path='/profiles' component={Profiles} />
        <PrivateRoute exact path='/create-profile' component={ProfileForm} />
        <PrivateRoute exact path='/edit-profile' component={ProfileForm} />
        <PrivateRoute exact path='/add-album' component={SearchAlbum} />
        <PrivateRoute exact path='/post-form' component={PostForm} />
        <PrivateRoute exact path='/add-artist' component={SearchArtists} />
        <PrivateRoute exact path='/add-track' component={SearchTracks} />
        <PrivateRoute exact path='/posts' name='Music Feed' component={Posts} />
        <PrivateRoute exact path='/settings' component={Settings} />
        <PrivateRoute exact path='/posts/:id' component={Post} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
