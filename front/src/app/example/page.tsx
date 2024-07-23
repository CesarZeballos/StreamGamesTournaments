'use client';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { increment, decrement, incrementByAmount } from '../../redux//slices/exampleSlice';

const ExampleComponent = () => {
  const dispatch = useAppDispatch();
  const value = useSelector((state: RootState) => state.example.value);

  return (
    <div>
      <h1>{value}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>Increment by 5</button>
    </div>
  );
};

export default ExampleComponent;