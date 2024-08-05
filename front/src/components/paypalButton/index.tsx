'use client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { captureOrderSlice, createOrderSlice } from '@/redux/thunks/tournamentsSliceThunk';
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
        console.log('PayPal SDK loaded');
      };

      script.onerror = () => {
        console.error('PayPal script failed to load.');
      };

      return () => {
        document.body.removeChild(script);
      };
    };

    loadPayPalScript();
  }, [clientId]);

  const handlePayPalClick = async () => {
    // @ts-ignore
    const paypal = window.paypal;

    if (!paypal) {
      console.error('PayPal SDK is not loaded');
      return;
    }

    try {
      const orderId = await dispatch(createOrderSlice(data)).unwrap();

      // Crear la orden
      paypal.Buttons({
        createOrder: (data, actions) => {
          return orderId;
        },
        onApprove: async (data, actions) => {
          console.log("orderId", data.orderID)
          try {
            await dispatch(captureOrderSlice(data.orderID)).unwrap();
            onSuccess(data.orderID);
          } catch (error) {
            console.error('Error capturing order:', error);
          }
        },
        onError: (err) => {
          console.error('PayPal Buttons error:', err);
        }
      }).render('#paypal-button-container');

      // Capturar la orden
      await paypal.Buttons().createOrder();
      await paypal.Buttons().onApprove();
    } catch (error) {
      console.error('Error handling PayPal payment:', error);
    }
  };

  return (
    <div>
      <button onClick={handlePayPalClick} style={{ /* tus estilos aquí */ }}>
        Pagar con PayPal
      </button>
      <div id="paypal-button-container" style={{ display: 'none' }}></div>
    </div>
  );
};

export default PayPalButton;
