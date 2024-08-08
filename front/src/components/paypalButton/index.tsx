import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { captureOrderSlice, createOrderSlice } from '@/redux/thunks/tournamentsSliceThunk';
import { ITournamentPayment } from '@/interfaces/interfaceRedux';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { IAddTeam } from '@/interfaces/interfaceTournaments';
import { toast } from 'sonner';

interface PayPalButtonProps {
  data: ITournamentPayment;
  teamData: IAddTeam;
  numberMembers: number;
  onSuccess: (orderId: string) => void;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ data, teamData, numberMembers, onSuccess }) => {
  const dispatch = useDispatch<AppDispatch>();
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  const teamLength = teamData.users.length;

  if (!clientId) {
    console.error('PayPal client ID is missing');
    return null;
  }

  return (
    <PayPalScriptProvider options={{ clientId, currency: 'USD' }}>
      <PayPalButtons
        createOrder={async () => {
          try {
            // if (teamLength < numberMembers) {
            //     toast.error(`this tournaments require ${numberMembers} team members. Need ${numberMembers - teamLength} more`, {
            //         position: 'top-right',
            //         duration: 1500,
            //     });
            //     return ''; // Asegúrate de devolver un string vacío si hay un error
            // } else if (teamLength > numberMembers) {
            //     toast.error(`this tournaments require ${numberMembers} team members. Need ${teamLength - numberMembers} less`, {
            //         position: 'top-right',
            //         duration: 1500,
            //     });
            //     return ''; // Asegúrate de devolver un string vacío si hay un error
            // } else {
              const orderId = await dispatch(createOrderSlice(data)).unwrap();
              return orderId; // Devuelve el orderID obtenido de la acción
            // }
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

