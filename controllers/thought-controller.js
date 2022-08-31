// WORK IN PROGRESS
const { Thought } = require("../models");

const thoughtController = {

  // TODO 
  // GET ALL THOUGHTS ➝ /api/thoughts
  getAllThoughts(req, res) {
    Thought.find({})

  },

  // TODO 
  // GET SINGLE THOUGHT BY ID ➝ /api/thoughts/:id


  // TODO: don't forget to push the created thought's _id to the associated user's thoughts array field
  // POST: CREATE NEW THOUGHT ➝ /api/thoughts
  


  // TODO 
  // PUT: UPDATE THOUGHT BY ID ➝ /api/thoughts/:id


  // TODO 
  // DELETE: REMOVE THOUGHT BY ID ➝ /api/thoughts/:id



  // TODO 
  // POST: CREATE A REACTION ➝ /api/thoughts/:thoughtId/reactions


  // TODO 
  // DELETE: REMOVE A REACTION ➝ /api/thoughts/:thoughtId/reactions/:reactionId
};





module.exports = thoughtController;