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

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=AXz-99dwGE8h4C8CxzG8iuB0BMhpu8codITuusodt8yi8CA8J3zOBOxZflOi2-z6bwnLXguvBJ-9qljz&currency=USD`;
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // @ts-ignore
      paypal.Buttons({
        createOrder: async () => {
          try {
            // Llamar a la acción de Redux para crear la orden
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
            // Llamar a la acción de Redux para capturar el pago
            await dispatch(captureOrderSlice(data.orderID)).unwrap();
            onSuccess(data.orderID);
          } catch (error) {
            console.error('Error capturing order:', error);
            // Manejar el error adecuadamente
          }
        },
      }).render('#paypal-button-container');
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [data, onSuccess, dispatch]);

  return <div id="paypal-button-container"></div>;
};

export default PayPalButton;