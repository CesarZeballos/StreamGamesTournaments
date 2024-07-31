// components/AdminDashboard/UsersArea/UserActions.tsx
import React from 'react';
import { IUser } from '@/interfaces/interfaceUser';

interface UserActionsProps {
  user: IUser;
}

const UserActions: React.FC<UserActionsProps> = ({ user }) => {
  const handleDelete = () => {
    // Lógica para eliminar usuario
  };

  const handleDeactivate = () => {
    // Lógica para dar de baja usuario
  };

  const handleDismissOrganizer = () => {
    // Lógica para despedir organizador
  };

  const handleAcceptOrganizer = () => {
    // Lógica para aceptar reclamo de organizador
  };

  return (
    <div>
      <button onClick={handleDelete}>Eliminar</button>
      <button onClick={handleDeactivate}>Dar de baja</button>
      {/* {user.isOrganizer && <button onClick={handleDismissOrganizer}>Despedir Organizador</button>} */}
      {/* {!user.isOrganizer && user.claimingOrganizer && <button onClick={handleAcceptOrganizer}>Aceptar Reclamo</button>} */}
    </div>
  );
};

export default UserActions;
