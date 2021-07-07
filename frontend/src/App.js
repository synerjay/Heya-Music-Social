import { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </Fragment>
    </Router>
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
