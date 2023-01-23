import mongoose from "mongoose"; //to help setup the model

//Step 1: Create mongoose schema
const PostSchema = new mongoose.schema(
    {
        userID: {
            type: Number,
            required: true
        },
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        location: String,
        description: String,
        userPicturePath: String,
        picturePath: String,
        likes: { //if one likes it, it will add to the map. If unlikes, remove from the Map.
            type: Map, //check if the userID exists in the map.
            of: Boolean, //value will be true always if it exists
        },
        comments: {
            type: Array,
            default: [],
        },
    },
    {timestamps: true}
);

//Step 2: Create mongoose model
const Post = mongoose.model("Post", PostSchema);
export default Post;

