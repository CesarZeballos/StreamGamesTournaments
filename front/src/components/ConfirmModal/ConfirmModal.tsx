import React from 'react';

interface ConfirmModalProps {
  show: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ show, message, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 outline-none focus:outline-none">
      <div className="bg-BGlight rounded-lg border-2 border-cyan-500 relative p-6 flex flex-col text-white">
        <p className='text-lightViolet text-lg'>{message}</p>
        <div className='flex flex-row justify-around m-4'>
        <button className='buttonPrimary' onClick={onCancel}>Cancel</button>
        <button className='buttonPrimary' onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;