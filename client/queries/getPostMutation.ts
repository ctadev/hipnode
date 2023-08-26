export const getPost = async (id: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_DEV_BACKEND_URL}/posts/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    } catch (error) {
        // error
    }
}