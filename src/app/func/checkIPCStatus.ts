export const checkIPCStatus = async () => {
    try {
        const respose = await api.debug.ping();
        return respose === 'pong';
    } catch (error) {
        console.log(error);
        return false;
    }    
}