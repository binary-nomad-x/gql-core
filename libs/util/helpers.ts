import * as bcrypt from 'bcrypt';

const hashPassword = async (password: string, saltOrRoutes: number = 10) => {
  return await bcrypt.hash(password, saltOrRoutes);
};

const comparePassword = async (
  plainPassword: string,
  hashedPassword: string,
) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
