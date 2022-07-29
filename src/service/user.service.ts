import User, { UserDocument } from "../model/user.model";
import { DocumentDefinition } from "mongoose";
import { omit } from "lodash";

// this is where the helper functions come in for db queries, by utilizing the model and DocumentDefinition from mongoose

// these helper functions will be called in routes.ts

export async function createUser(input: DocumentDefinition<UserDocument>) {
  try {
    return await User.create(input);
  } catch (e) {
    throw new Error(e);
  }
}

function findUser() {}

export async function validatePassword({
  email,
  password,
}: {
  email: UserDocument["email"];
  password: string;
}) {
  const user = await User.findOne({ email });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) {
    return false;
  }

  return omit(user.toJSON(), "password");
}
