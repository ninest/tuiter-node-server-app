import usersModel from "./users-model.js";

export const findAllUsers = () => usersModel.find();
export const findUserById = (id) => usersModel.findById(id);
export const findUserByUsername = (username) => usersModel.findOne({ username });
export const findUserByCredentials = (username, password) => usersModel.findOne({ username, password });
export const createUser = (user) => usersModel.create(user);
export const updateUser = async (id, user) => {
  console.log("Updating user to ", { firstName: user.firstName, lastName: user.lastName });
  const res = await usersModel.updateOne({ _id: id }, { $set: { firstName: user.firstName, lastName: user.lastName } });
  console.log(res)
};
export const deleteUser = (id) => usersModel.deleteOne({ _id: id });
