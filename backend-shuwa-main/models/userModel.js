import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    mobile: {
      type: Number,
      unique: true,
      required: true,
    },
    password: { type: String },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    var user = this;
    const SALT_WORK_FACTOR = 10;
    if (!user.isModified("password")) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparedPassword = function (candidatePassword) {
  try {
    return bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    if (error) return error;
  }
};

export const User = mongoose.model("User", userSchema);
