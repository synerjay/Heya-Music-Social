import { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState();

  const newProfile = () => {
    const uploadData = new FormData();
    uploadData.append('bio', bio);

    uploadData.append('avatar', avatar, avatar.name);

    fetch('/profile/', {
      method: 'POST',
      body: uploadData,
      headers: {
        Authorization: 'Token db1e022ecbcd40f72b8d1dbdfa19e1aa776905bb',
        'content-type':
          'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error));

    // 'content-type':
    //     'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',

    // axios.get('/profile/me', {headers: { 'Authorization': 'Token db1e022ecbcd40f72b8d1dbdfa19e1aa776905bb'}}).then((res) => console.log(res))
    // .catch((error) => console.error(error.response.data));

    // still need to put the AUTHORIZATION TOKEN
    // axios
    //   .post('/profile/', uploadData, {
    //     headers: {
    //       Authorization: 'Token db1e022ecbcd40f72b8d1dbdfa19e1aa776905bb',
    //     },
    //   })
    //   .then((res) => console.log(res.response.data))
    //   .catch((error) => console.error(error.response.data));
  };

  return (
    <div className='App'>
      <h2> This is the future site of the Django-React app</h2>
      <h2> CRUD Testing for Profile Forms and Image Upload </h2>
      <label>
        Bio
        <input
          type='text'
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </label>
      <br />
      <label>
        Avatar
        <input type='file' onChange={(e) => setAvatar(e.target.files[0])} />
        {/* e.target.files is an array so we need to target the first item which is at index [0] */}
      </label>
      <br />
      <button onClick={() => newProfile()}>New Profile</button>
    </div>
  );
};

export default App;
