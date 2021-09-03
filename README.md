
<img src="https://github.com/synerjay/Heya-Music-Social/blob/main/github/heyamusiclogo.png?raw=true" />

# Heya Music Social

A social network app that lets users see what songs their friends are listening to. Utilizing the open sourced Spotify Web API, clients are able to search any songs to their profiles stored in PostgreSQL. User avatars and images are stored using AWS S3. Although it uses Spotify API to fetch music data, a Spotify account is NOT necessary to sign up in the social network.

## Landing page

<img src="https://github.com/synerjay/Heya-Music-Social/blob/main/github/landingpage.png?raw=true" />

## Dashboard 
Once the user adds their favorite artists, musical genre and favorite tracks, the dashboard shows the recommended tracks based on their profile.

<img src="https://github.com/synerjay/Heya-Music-Social/blob/main/github/dashboarddemo.gif?raw=true" />

## Status Updates and Latest Music Feed
Users are able to change their status updates and tell their friends what songs they are currently listening to. Users are able to add a comment with the status update.

<img src="https://github.com/synerjay/Heya-Music-Social/blob/main/github/listeningsongdemo.gif?raw=true" />

Users are able to comment and like each others' music status updates

<img src="https://github.com/synerjay/Heya-Music-Social/blob/main/github/statusupdate.png?raw=true" />

## Adding favorite artists, albums and tracks
In addition to status updates, users can add favorite artists, albums and tracks on their profiles which the dashboard recommendation functionality uses to recommend new tracks for the users. The search function uses Spotify API to autocomplete the users' search intentions. 

<img src="https://github.com/synerjay/Heya-Music-Social/blob/main/github/addartistsdemo.gif?raw=true" />

## Member Profile

Each member features a personal profile which shows their favorite genre, artists, albums and tracks to other users.

<img src="https://github.com/synerjay/Heya-Music-Social/blob/main/github/profile.png?raw=true" />

## Spotify API

This app uses the Spotify Web API endpoint to fetch recommendations, artists, albums and tracks. The API is called using the <a href="https://www.npmjs.com/package/spotify-web-api-node"> Spotify Web API node package</a>. Since user authentication aren't used, a Spotify account isn't necessary to sign up. But in future development, it may be required to access song playback functionality. 

## User Authentication Token System

This app uses a native <a href="https://www.django-rest-framework.org/api-guide/authentication/">Django REST token authentication</a> system. Once logged in, tokens are stored in client's local storage which are then set to every API call from React frontend to Django REST backend using <a href="https://www.npmjs.com/package/axios">Axios</a>.

## Technologies Used
- React
- Redux
- Django REST Framework
- Spotify Web API
- Tailwind CSS
- Amazon Web Services S3
- PostgreSQL
- Heroku

See a live demo here: https://heya-music-social.herokuapp.com/
