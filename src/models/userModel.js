import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [2, "First name must be at least 2 characters"],
      maxlength: [50, "First name cannot exceed 50 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: [2, "Last name must be at least 2 characters"],
      maxlength: [50, "Last name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/,
        "Please fill a valid email address",
      ],
    },
    profilePic: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740",
    
    },
   phone: {
  type: String,
  required: [true, "Phone number is required"],
  validate: {
    validator: function (v) {
      return /^0\d{9}$/.test(v);
    },
    message: "Phone number must be 10 digits and start with 0 ",
  },
},

    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      default: "User",  
      enum: {
        values: ["User", "Admin"],
        message: "Role must be either 'User' or 'Admin'",
      },
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
    },
    otpCode: {
      type: String,
      select: false,
    },
    otpExpires: {
      type: Date,
      select: false,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("Users", userSchema);
export default User;
