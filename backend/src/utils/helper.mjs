import bcrypt from 'bcrypt';

export const hashPassword = async (password) => { 
    try {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    } catch (error) {
        return error;
    }
}

export const comparePassword =  (password, hash) => {
    try {
        return  bcrypt.compareSync(password, hash);
    } catch (error) {
        return error;
    }
}

export const generateTicketId = () => {
    const prefix = 'TKT';
    const random1 = Math.floor(Math.random() * 100) + 1;
    const random2 = Math.floor(Math.random() * 1000) + 1;
    const random3 = Math.floor(Math.random() * 10) + 1;
    const ticketId = `${prefix}-${random1}${random2}${random3}`;
    return ticketId;
}

export const generateUserId = () => {
  const prefix = "EMP";
  const random1 = Math.floor(Math.random() * 100) + 1;
  const random2 = Math.floor(Math.random() * 1000) + 1;
  const random3 = Math.floor(Math.random() * 10) + 1;
  const Id = `${prefix}-${random1}${random2}${random3}`;
  return Id;
};

export const generateDeptId = () => {
  const prefix = "DEPT";
  const random1 = Math.floor(Math.random() * 100) + 1;
  const random2 = Math.floor(Math.random() * 1000) + 1;
  const random3 = Math.floor(Math.random() * 10) + 1;
  const Id = `${prefix}-${random1}${random2}${random3}`;
  return Id;
};

export const generatePCategoryId = () => {
  const prefix = "PCATGO";
  const random1 = Math.floor(Math.random() * 100) + 1;
  const random2 = Math.floor(Math.random() * 1000) + 1;
  const random3 = Math.floor(Math.random() * 10) + 1;
  const Id = `${prefix}-${random1}${random2}${random3}`;
  return Id;
};

export const generateCategoryId = () => {
  const prefix = "CATGO";
  const random1 = Math.floor(Math.random() * 100) + 1;
  const random2 = Math.floor(Math.random() * 1000) + 1;
  const random3 = Math.floor(Math.random() * 10) + 1;
  const Id = `${prefix}-${random1}${random2}${random3}`;
  return Id;
};