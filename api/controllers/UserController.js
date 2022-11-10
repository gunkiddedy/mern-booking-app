import User from "../models/UserModel.js"

// UPDATE
export const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body},
      { new: true} // send back the data in updated version
    )
    res.status(200).json(updatedUser)
  } catch (error) {
    next(error)
  }
}

// DELETE
export const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id
    await User.findByIdAndDelete(id)
    res.status(200).json('User has been deleted.')
  } catch (error) {
    next(error)
  }
}

// GET
export const getUser = async (req, res, next) => {
  try {
    const id = req.params.id
    const user = await User.findById(id)
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

// GET ALL
export const getUsers = async (req, res, next) => {
  // const failed = true
  // if(failed) return next(createError(401, "You're not authenticated!"))
  try {
    const users = await User.find()
    res.status(200).json(users) 
  } catch (error) {
    // res.status(500).json(error)
    next(error)
  }
}