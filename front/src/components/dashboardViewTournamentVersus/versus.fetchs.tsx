export const createVersus = async (tournamentId: string): Promise<void> => {
  try {
    const response = await fetch(`/api/versus/${tournamentId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error creating versus');
    }

    console.log('Versus created successfully');
  } catch (error) {
    console.error('Error:', error);
  }
};

export const updateWinnerRound = async (versusId: string, winnerId: string): Promise<void> => {
  try {
    const response = await fetch(`/api/versus/${winnerId}/${versusId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error updating winner');
    }

    console.log('Winner updated successfully');
  } catch (error) {
    console.error('Error:', error);
  }
};
