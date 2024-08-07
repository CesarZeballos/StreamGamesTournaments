'use client';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { captureOrderSlice, createOrderSlice } from '@/redux/thunks/tournamentsSliceThunk';
import { ITournamentPayment } from '@/interfaces/interfaceRedux';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { IAddTeam } from '@/interfaces/interfaceTournaments';
import { toast } from 'sonner';
import { useState } from 'react';

interface PayPalButtonProps {
  data: ITournamentPayment;
  teamData: IAddTeam;
  numberMembers: number;
  onSuccess: (orderId: string) => void;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ data, teamData, numberMembers, onSuccess }) => {
  const dispatch = useDispatch<AppDispatch>();
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const [teamOk, setTeamOk] = useState(false)

  if (!clientId) {
    console.error('PayPal client ID is missing');
    return null;
  }

  const teamLength = teamData.users.length
  if (teamLength < numberMembers) {
    setTeamOk(false)
      toast.error(`this tournaments require ${numberMembers} team members. Need ${numberMembers - teamLength} more`, {
          position: 'top-right',
          duration: 1500,
      })
  } else if (teamLength > numberMembers) {
    setTeamOk(false)
      toast.error(`this tournaments require ${numberMembers} team members. Need ${teamLength - numberMembers} less`, {
          position: 'top-right',
          duration: 1500,
      })
  } else {
    setTeamOk(true)
  }

  return (
    <PayPalScriptProvider options={{ clientId, currency: 'USD' }}>
      <PayPalButtons
        createOrder={async () => {
          if (!teamOk) {
            return '';
          } else {
              try {
                const orderId = await dispatch(createOrderSlice(data)).unwrap();
                return orderId;
              } catch (error) {
                console.error('Error creating order:', error);
                return '';
              }   
          }
        }}
        onApprove={async (data: { orderID: string }) => {
          try {
            await dispatch(captureOrderSlice(data.orderID)).unwrap();
            onSuccess(data.orderID);
          } catch (error) {
            console.error('Error capturing order:', error);
          }
        }}
        onError={(err: any) => {
          console.error('PayPal Buttons error:', err);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
