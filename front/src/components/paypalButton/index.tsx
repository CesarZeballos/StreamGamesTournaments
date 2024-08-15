import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { captureOrderSlice, createOrderSlice } from '@/redux/thunks/tournamentsSliceThunk';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface PayPalButtonProps {
  tournamentId: string;
  onSuccess: (orderId: string) => void;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ tournamentId, onSuccess }) => {
  const dispatch = useDispatch<AppDispatch>();
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  const token = useSelector((state: RootState) => state.user.token);

  if (!clientId) {
    console.error('PayPal client ID is missing');
    return null;
  }

  return (
    <PayPalScriptProvider options={{ clientId, currency: 'USD' }}>
      <PayPalButtons
        createOrder={async () => {
          try {
            const response = await dispatch(createOrderSlice({
              tournamentId: tournamentId,
              token: token!
            })).unwrap();
            const orderId = response.id

            return orderId; // Devuelve el orderID obtenido de la acción
          } catch (error) {
            console.error('Error creating order:', error);
            return ''; // Asegúrate de devolver un string vacío en caso de error
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

