import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  sidebarClasses,
} from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaUserFriends,
  FaBoxOpen,
  FaCogs,
} from 'react-icons/fa';
import './Sidebar.css';

const DarkSidebarComponent = () => {
  return (
    <Sidebar
      backgroundColor="#1f242e"
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          color: '#E0E0E0',
          height: '100vh',
          borderRight: `1px solid #1f242e !important`,

        },
      }}
    >
      <div style={{
        padding: '20px 16px',
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#1A73E8',
        letterSpacing: '-0.5px',
      }}>
        Zaanndou Admin
      </div>

      <Menu
        menuItemStyles={{
          button: ({ active }) => ({
            backgroundColor: active ? 'transparent' : 'transparent',
            color: '#E0E0E0',
            borderRadius: '8px',
            margin: '4px 12px',
            padding: '10px 12px',
            transition: 'background-color 0.2s ease',
            '&:hover': {
              backgroundColor: 'transparent',
              color: '#2E8DF7',
            },
          }),
          icon: {
            color: '#A0A0A0',
            fontSize: '16px',
            marginRight: '12px',
          },
          subMenuContent: {
            backgroundColor: '#141821', // couleur de fond du sub menu ajustée
            paddingLeft: '20px',
          },
        }}
      >
        <SubMenu icon={<FaTachometerAlt />} label="Dashboard">
          <MenuItem component={<Link to="/dashboard" />}> Vue générale </MenuItem>
          {/* <MenuItem component={<Link to="/analytics" />}> Analytique </MenuItem> */}
        </SubMenu>

        <MenuItem icon={<FaUserFriends />} component={<Link to="/users" />}> Utilisateurs </MenuItem>
        <MenuItem icon={<FaBoxOpen />} component={<Link to="/products" />}> Produits </MenuItem>
        <MenuItem icon={<FaCogs />}> Paramètres </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default DarkSidebarComponent;
