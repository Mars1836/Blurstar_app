import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AvatarBox from "~/components/Avatar/Inherit/AvatarBox";
import FollowBtn from "~/components/FollowBtn/FollowBtn";
import UnfollowBtn from "~/components/FollowBtn/UnfollowBtn";
function UserItem({ user, mainUser }) {
  const isFollowinged = useSelector((state) => {
    const following = state.mainUser.data?.following;
    if (following) {
      return following.includes(user._id);
    }
  });
  return (
    <div>
      <AvatarBox
        username={user?.username}
        name={user?.name}
        url={user?.avatar}
        key={user._id}
        btn={
          isFollowinged ? (
            <UnfollowBtn author={user}></UnfollowBtn>
          ) : (
            <FollowBtn author={user}></FollowBtn>
          )
        }
      ></AvatarBox>
    </div>
  );
}

export default UserItem;
