// WORK IN PROGRESS
const { Thought, User } = require("../models");

const thoughtController = {
  // DONE 
  // GET ALL THOUGHTS ➝ /api/thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .sort({ _id: -1 })
      .select("-__v")
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // DONE 
  // GET SINGLE THOUGHT BY ID ➝ /api/thoughts/:id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      // .populate({
      //   path: "reactions",
      //   select: "-__v",
      // })
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // DONE 
  // POST: CREATE NEW THOUGHT ➝ /api/thoughts
  createThought({ params, body }, res) {
    // console.log(body);
    Thought.create(body)
      .then((dbThoughtData) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: dbThoughtData._id } },
          { new: true, runValidators: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  // TODO
  // PUT: UPDATE THOUGHT BY ID ➝ /api/thoughts/:id
  // updateThought()

  
  // REVIEW: Make sure deleted thought gets removed from user as well
  // DELETE: REMOVE THOUGHT BY ID ➝ /api/thoughts/:id
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: "No thought found with this id!" });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // TODO
  // POST: CREATE A REACTION ➝ /api/thoughts/:thoughtId/reactions
  // addReaction()

  // TODO
  // DELETE: REMOVE A REACTION ➝ /api/thoughts/:thoughtId/reactions/:reactionId
  // removeReaction()
};

module.exports = thoughtController;
