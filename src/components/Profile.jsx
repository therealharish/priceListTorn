import React from 'react';
import '../styles/Profile.css';

const Profile = () => {
  
  return (
    <div className = "profile-ctn">
        <div className = "profile-image">
              <a href="https://www.torn.com/profiles.php?XID=2097793" rel="nofollow">
                      <img src="https://www.torn.com/sigs/11_2097793.png" height="84" width="346" alt="Torn" />
              </a>
        </div>
        <a style = {{textDecoration: "none"}}className = "profile-button" href="https://www.torn.com/trade.php#step=start&userID=2097793" rel="nofollow">
          <div>
              START TRADE
          </div>
        </a>
    </div>
  );
};

export default Profile;
