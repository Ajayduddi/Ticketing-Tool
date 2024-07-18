import bcrypt from 'bcrypt';

export const hashPassword = async (password) => { 
    try {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    } catch (error) {
        return error;
    }
}

export const comparePassword = async (password, hash) => {
    try {
        return await bcrypt.compare(password, hash);
    } catch (error) {
        return error;
    }
}

export const generateTicketId = () => {
    const prefix = 'TKT';
    const random1 = Math.floor(Math.random() * 100) + 1;
    const random2 = Math.floor(Math.random() * 1000) + 1;
    const random3 = Math.floor(Math.random() * 10000) + 1;
    const random4 = Math.floor(Math.random() * 1000000) + 1;
    const random5 = Math.floor(Math.random() * 10) + 1;
    const ticketId = `${prefix}-${random1}-${random2}-${random3}-${random4}-${random5}`;
    return ticketId;
}
