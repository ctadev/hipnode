export const getLikes = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_DEV_BACKEND_URL}/likes`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('There was an error:', error);
  }
};
