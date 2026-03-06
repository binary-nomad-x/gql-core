import * as bcrypt from 'bcrypt';

export const hashPassword = async (
  password: string,
  saltOrRounds: number = 10,
) => {
  return await bcrypt.hash(password, saltOrRounds);
};

export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string,
) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
