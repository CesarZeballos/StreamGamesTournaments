// components/AdminDashboard/UsersArea/UserItem.tsx
import React from 'react';
import UserActions from './UserActions';
import { IUser } from '@/interfaces/interfaceUser';

interface UserItemProps {
  user: IUser;
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
  return (
    <div>
      <p>{user.nickName}</p>
      <p>{user.role}</p>
      {/* <p>{user.teams ? 'With Team' : 'Without Team'}</p> */}
      <p>{user.tournaments ? 'In Tournament' : 'Without Tournament'}</p>
      <UserActions user={user} />
    </div>
  );
};

export default UserItem;
