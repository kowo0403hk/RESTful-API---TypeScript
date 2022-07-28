import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

// extend the mongoose Document class so that the UserDocument will include id, version, etc.
export interface UserDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  createAt: Date;
  updateAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// create a schema for the User model
const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// HookNextFunction was removed in v6 of mongoose, below is a workaround
export interface HookNextFunction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (error?: Error): any;
}

//  to get the user.password and hash it, so that we can compare in the next stage
UserSchema.pre("save", async function (next: HookNextFunction) {
  let user = this as UserDocument;

  // only hash the password if it has been modified or is new
  if (!user.isModified("password")) return next();

  // Random additional data
  const salt = await bcrypt.genSalt(config.get("saltWorkFactor"));
  const hash = await bcrypt.hashSync(user.password, salt);

  // Replace the password with the hash
  user.password = hash;
  return next();
});

// for login purposes, to compare hashed password
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

// create the user model
const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;
