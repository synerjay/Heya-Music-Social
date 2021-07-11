import { useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/routing/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';
import ProfileForm from './components/profile-forms/ProfileForm';
import AddGenre from './components/profile-forms/AddGenre';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import AddArtist from './components/profile-forms/AddArtist';
import AddTrack from './components/profile-forms/AddTrack';

const App = () => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
    }
    setTimeout(() => {
      store.dispatch(loadUser());
    }, 1000);
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Landing} />
            <section className='container'>
              <Alert />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute
                exact
                path='/create-profile'
                component={ProfileForm}
              />
              <PrivateRoute
                exact
                path='/edit-profile'
                component={ProfileForm}
              />
              <PrivateRoute exact path='/add-genre' component={AddGenre} />
              <PrivateRoute exact path='/add-artist' component={AddArtist} />
              <PrivateRoute exact path='/add-track' component={AddTrack} />
            </section>
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;

// Forms with uploading Photos

// const [bio, setBio] = useState('');
//   const [avatar, setAvatar] = useState();
//   const [profile, setProfile] = useState();

//   const newProfile = () => {
//     const uploadData = new FormData();
//     uploadData.append('bio', bio);
//     uploadData.append('avatar', avatar, avatar.name);

//     fetch('/profile/', {
//       method: 'POST',
//       body: uploadData,
//       headers: {
//         Authorization: 'Token db1e022ecbcd40f72b8d1dbdfa19e1aa776905bb',
//       },
//     })
//       .then((res) => res.json())
//       .then((res) => {
//         console.log(res);
//         setProfile(res);
//       })
//       .catch((error) => console.log(error));
//   };

//   return (
//     <div className='App'>
//       <h2> This is the future site of the Django-React app</h2>
//       <h2> CRUD Testing for Profile Forms and Image Upload </h2>
//       <label>
//         Bio
//         <input
//           type='text'
//           value={bio}
//           onChange={(e) => setBio(e.target.value)}
//         />
//       </label>
//       <br />
//       <label>
//         Avatar
//         <input type='file' onChange={(e) => setAvatar(e.target.files[0])} />
//         {/* e.target.files is an array so we need to target the first item which is at index [0] */}
//       </label>
//       <br />
//       <button onClick={() => newProfile()}>New Profile</button>
//       {profile ? <img src={profile.profile.avatar_url} /> : null}
//     </div>
//   );
