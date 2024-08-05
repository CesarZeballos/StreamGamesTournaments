'use client';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { captureOrderSlice, createOrderSlice } from '@/redux/thunks/tournamentsSliceThunk';
import { IAddTeamToTournament } from '@/interfaces/interfaceRedux';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface PayPalButtonProps {
  data: IAddTeamToTournament;
  onSuccess: (orderId: string) => void;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ data, onSuccess }) => {
  const dispatch = useDispatch<AppDispatch>();
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  if (!clientId) {
    console.error('PayPal client ID is missing');
    return null;
  }

  return (
    <PayPalScriptProvider options={{ clientId, currency: 'USD' }}>
      <PayPalButtons
        createOrder={async () => {
          try {
            const orderId = await dispatch(createOrderSlice(data)).unwrap();
            return orderId; // Asegúrate de que esta acción devuelva el orderID
          } catch (error) {
            console.error('Error creating order:', error);
            return '';
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
