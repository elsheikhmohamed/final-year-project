import "./leftBar.scss";
import Home from "../../assets/home.png";
import Chat from "../../assets/chat.png";
import Notification from "../../assets/notification.png";
import Articles from "../../assets/article.png";
import Notes from "../../assets/notes.png";
import Settings from "../../assets/settings.png";
import Logout from "../../assets/logout.png";

const LeftBar = () => {
  return (
    <div className="leftBar">
      <div className="container">
        <MenuSection title="Main">
          <MenuItem icon={Home} text="Home" />
          <MenuItem icon={Chat} text="Chat" />
          <MenuItem icon={Notification} text="Notification" />
        </MenuSection>
        <hr />
        <MenuSection title="Education">
          <MenuItem icon={Articles} text="Articles" />
          <MenuItem icon={Notes} text="Notes" />
        </MenuSection>
        <hr />
        <MenuSection title="Account">
          <MenuItem icon={Settings} text="Settings" />
          <MenuItem icon={Logout} text="Log Out" />
        </MenuSection>
      </div>
    </div>
  );
};

const MenuSection = ({ title, children }) => {
  return (
    <>
      <div className="menu">
        <span>{title}</span>
        {children}
      </div>
    </>
  );
};

const MenuItem = ({ icon, text }) => {
  return (
    <div className="item">
      <img src={icon} alt="" />
      <span>{text}</span>
    </div>
  );
};

export default LeftBar;
