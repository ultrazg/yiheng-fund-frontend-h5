import Index from '../Views/Index';
import About from '../Views/About';
import Risk from '../Views/Risk';
import Privacy from '../Views/Privacy';
import Complaint from '../Views/Complaint';
import Contactus from '../Views/Contactus';
import Register from '../Views/Register';
import Login from '../Views/Login';
import Found from '../Views/Found';
import Market from '../Views/Market';
import Buy from '../Views/Buy';
import User from '../Views/User';
import News from '../Views/News';
import NewsDetail from '../Views/NewsDetail';
import Reserve from '../Views/Reserve';
import Faq from '../Views/Faq';
import Lives from '../Views/Lives';
import LiveRoom from '../Views/LiveRoom';
import Article from '../Views/Article';
import UserPage from '../Views/UserPage';
import Feedback from '../Views/Feedback';

export default [
  {
    path: '/',
    name: 'App',
    component: Index
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/risk',
    name: 'Risk',
    component: Risk
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: Privacy,
  },
  {
    path: '/complaint',
    name: 'Complaint',
    component: Complaint
  },
  {
    path: '/contactus',
    name: 'Contactus',
    component: Contactus
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/found',
    name: 'Found',
    component: Found
  },
  {
    path: '/market',
    name: 'Market',
    component: Market
  },
  {
    path: '/buy',
    name: 'Buy',
    component: Buy,
    auth: true
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    auth: true
  },
  {
    path: '/news',
    name: 'News',
    component: News
  },
  {
    path: '/reserve',
    name: 'Reserve',
    component: Reserve
  },
  {
    path: '/faq',
    name: 'Faq',
    component: Faq
  },
  {
    path: '/lives',
    name: 'Lives',
    component: Lives
  },
  {
    path: '/liveroom',
    name: 'LiveRoom',
    component: LiveRoom,
    auth: true
  },
  {
    path: '/newsdetail',
    name: 'NewsDetail',
    component: NewsDetail
  },
  {
    path:'/article/:id',
    name:'Article',
    component:Article,
    exact:true
  },
  {
    path:'/user/info',
    name:'UserPage',
    component:UserPage,
    auth:true,
    exact:true
  },
  {
    path:'/feedback',
    name:'Feedback',
    component:Feedback
  }
]