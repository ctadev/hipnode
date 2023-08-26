export const createComment = async (data: any, token: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_DEV_BACKEND_URL}/comments/${data.post_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
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