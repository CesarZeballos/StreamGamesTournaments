'use client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { captureOrderSlice, createOrderSlice, postTeamToTournamentSlice } from '@/redux/thunks/tournamentsSliceThunk';
import { IAddTeamToTournament } from '@/interfaces/interfaceRedux';

interface PayPalButtonProps {
  data: IAddTeamToTournament;
  onSuccess: (orderId: string) => void;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ data, onSuccess }) => {
  const dispatch = useDispatch<AppDispatch>();
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;  // Accede a la variable de entorno

  useEffect(() => {
    if (!clientId) {
      console.error('PayPal client ID is missing');
      return;
    }

    const loadPayPalScript = () => {
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        // @ts-ignore
        paypal.Buttons({
          createOrder: async () => {
            try {
              const orderId = await dispatch(createOrderSlice(data)).unwrap();
              return orderId; // Asegúrate de que esta acción devuelva el orderID
            } catch (error) {
              console.error('Error creating order:', error);
              // Manejar el error adecuadamente
              return '';
            }
          },
          onApprove: async (data: { orderID: string }) => {
            console.log("orderId", data.orderID)
            try {
              await dispatch(captureOrderSlice(data.orderID)).unwrap();
              onSuccess(data.orderID);
            } catch (error) {
              console.error('Error capturing order:', error);
              // Manejar el error adecuadamente
            }
          },
          onError: (err: any) => {
            console.error('PayPal Buttons error:', err);
          }
        }).render('#paypal-button-container');
      };

      script.onerror = () => {
        console.error('PayPal script failed to load.');
      };

      return () => {
        document.body.removeChild(script);
      };
    };

    loadPayPalScript();

  }, [data, onSuccess, dispatch, clientId]);

  return <div id="paypal-button-container"></div>;
};

export default PayPalButton;