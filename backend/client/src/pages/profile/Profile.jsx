import "./profile.scss";

import SchoolIcon from '@mui/icons-material/School';
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import Posts from "../../components/posts/Posts";

const Profile = () => {
  return (
    <section className="profile">
      <div className="profilePicContainer"></div>
      <div className="profileContainer">

        <div className="uInfo">
        <img
          src={`https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load`}
          alt=""
          className="profilePic"
        />
          <div className="center">
            <span>Jane Doe</span>
            <div className="info">
              <div className="item">
                <SchoolIcon />
                <span>City, University Of London</span>
              </div>
            </div>
            <button>Follow</button>
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
        <Posts />
      </div>
    </section>
  );
};

export default Profile;
