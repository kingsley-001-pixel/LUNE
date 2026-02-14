import mongoose, { Schema } from "mongoose";

const tmdbSchema = new Schema ({
    moviename: {
        type: String,
        required: true,
        minLength: 1,
}
},
{
    timestamps: true
}
)

export const Tmdb = mongoose.model("Tmdb", tmdbSchema)