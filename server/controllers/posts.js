import Post from "../models/Post.js";
import User from "../models/User.js";

//what functions we want

/* CREATE function */
export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body; // things that frontend is going to send. in this case the user that is sending it plus the picture url.
        const user = await User.findById(userId); //grab the user information
        const newPost = new Post({ //create new post into the database
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            iserPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        })
        await newPost.save(); //to ensure it is saved into mongoDB

        const post = await Post.find(); // to ensure we grab ALL the post

        res.status(201).json(post); // to return the post to the frontEnd and has the list of the updated post

    } catch(err) {
        res.status(409).json({ message: err.message})
    }
}


/* READ function */
/* UPDATE function */
/* DELETE function */