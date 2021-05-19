import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faChartBar, faUser } from '@fortawesome/free-regular-svg-icons';
import { faBell, faBullhorn, faCamera, faCampground, faCaretDown, faCommentAlt, faEllipsisH, faFlag, faGamepad, faHandsHelping, faHeartbeat, faHome, faImages, faPencilAlt, faSearch, faShare, faSignOutAlt, faSmile, faStore, faTh, faThumbsUp, faTrash, faTrashAlt, faTv, faUserFriends, faUserPlus, faUsers, faUserTag, faUserTimes } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { AlertContextProvider } from './contexts/AlertContext';
import { AuthContextProvider } from './contexts/AuthContext';
import registerServiceWorker from './registerServiceWorker';

const rootElement = document.getElementById('root');

library.add(fab, faHome, faTv, faStore, faUser, faUsers, faGamepad, faSearch, faTh, faBell, faCaretDown, faHeartbeat, faUserFriends, faFlag,
  faBullhorn, faChartBar, faCampground, faHandsHelping, faImages, faUserTag, faSmile, faThumbsUp, faCommentAlt, faShare,
  faSignOutAlt, faEllipsisH, faPencilAlt, faTrashAlt, faCamera, faUserPlus, faTrash, faUserTimes
);

ReactDOM.render(
  <AuthContextProvider >
    <AlertContextProvider>
      <App />
    </AlertContextProvider>
  </AuthContextProvider>
  ,
  rootElement);

registerServiceWorker();

