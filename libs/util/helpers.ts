import * as bcrypt from 'bcrypt';

export const hashPassword = async (
  password: string,
  saltOrRoutes: number = 10,
) => {
  return await bcrypt.hash(password, saltOrRoutes);
};

export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string,
) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
