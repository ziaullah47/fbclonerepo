import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faChartBar } from '@fortawesome/free-regular-svg-icons';
import { faBell, faBullhorn, faCampground, faCaretDown, faCommentAlt, faEllipsisH, faFlag, faGamepad, faHandsHelping, faHeartbeat, faHome, faImages, faPencilAlt, faSearch, faShare, faSignOutAlt, faSmile, faStore, faTh, faThumbsUp, faTrashAlt, faTv, faUserFriends, faUsers, faUserTag } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

library.add(fab, faHome, faTv, faStore, faUsers, faGamepad, faSearch, faTh, faBell, faCaretDown, faHeartbeat, faUserFriends, faFlag,
    faBullhorn, faChartBar, faCampground, faHandsHelping, faImages, faUserTag, faSmile, faThumbsUp, faCommentAlt, faShare,
    faSignOutAlt, faEllipsisH, faPencilAlt, faTrashAlt
  );

ReactDOM.render(
  <BrowserRouter basename={baseUrl!}>
    <App />
  </BrowserRouter>,
  rootElement);

registerServiceWorker();

