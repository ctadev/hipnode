export const loginUser = async (data: any) => {
    try {

        const response = await fetch(`${import.meta.env.VITE_DEV_BACKEND_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        return response.json();
    } catch (error) {
        console.error('There was an error:', error);
    }
}
