export const checkIPCStatus = async () => {
    try {
        const respose = await api.ping();
        return respose === 'pong';
    } catch (error) {
        console.log(error);
        return false;
    }    
}