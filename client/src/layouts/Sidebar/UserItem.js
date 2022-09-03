import React, { useEffect, useState } from "react";
import AvatarBox from "~/components/Avatar/Inherit/AvatarBox";
import FollowBtn from "~/components/FollowBtn/FollowBtn";
import UnfollowBtn from "~/components/FollowBtn/UnfollowBtn";
function UserItem({ user, mainUser }) {
  const [isFollowing, setIsFollowing] = useState(null);
  useEffect(() => {
    setIsFollowing(user.followers.includes(mainUser._id));
  }, []);
  return (
    <div>
      <AvatarBox
        user={user}
        key={user._id}
        btn={
          isFollowing ? (
            <UnfollowBtn
              user={user}
              mainUser={mainUser}
              action={() => {
                setIsFollowing(false);
              }}
            ></UnfollowBtn>
          ) : (
            <FollowBtn
              user={user}
              mainUser={mainUser}
              action={() => {
                setIsFollowing(true);
              }}
            ></FollowBtn>
          )
        }
      ></AvatarBox>
    </div>
  );
}

export default UserItem;
