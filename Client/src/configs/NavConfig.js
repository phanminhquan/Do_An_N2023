
// component
import SvgColor from '../components/svg-color';


// ----------------------------------------------------------------------
const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const output = [
    {
      title: 'dashboard',
      path: '/dashboard/app',
      icon: icon('ic_analytics'),
    },
    {
      title: 'user',
      path: '/dashboard/user',
      icon: icon('ic_user'),
    },
    {
      title: 'login',
      path: '/login',
      icon: icon('ic_lock'),
    }
    
  ];



export const navConfig = output

export const logined=[
  
    {
      title: 'dashboard',
      path: '/dashboard/app',
      icon: icon('ic_analytics'),
    },
    {
      title: 'user',
      path: '/dashboard/user',
      icon: icon('ic_user'),
    },
    {
      title: 'logout',
      path: '',
      icon: icon('ic_user'),
    }
  
]

