import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema ({
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLength: 1,
        maxLength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 50
    }
},
{
    timestamps: true
}
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {next};

    this.password = await bcrypt.hash(this.password, 10)
    next;
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


export const User = mongoose.model("User", userSchema);