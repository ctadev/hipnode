export const reportPost = async (loggedInUser:any, reportInfo:any) => {
    try {
        fetch(`${import.meta.env.VITE_DEV_BACKEND_URL}/reports`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${loggedInUser.token}`
            },
            body: JSON.stringify(reportInfo)
        })
    } catch (error) {
        // handle error
    }
}