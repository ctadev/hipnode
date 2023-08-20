export const registerUser = async (data: any) => {
    try {

        const response = await fetch(`${import.meta.env.VITE_DEV_BACKEND_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        
        if (!response) {
            throw new Error('Something went wrong');
        }
        
        return response.json();
    } catch (error) {
        console.error('There was an error:', error);
    }
};