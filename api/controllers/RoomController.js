import Room from "../models/RoomModel.js"
import Hotel from "../models/HotelModel.js"

// CREATE
export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid
  const newRoom = new Room(req.body)

  try {
    const savedRoom = await newRoom.save()
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: {
          rooms: savedRoom._id
        }
      })
    } catch (error) {
      next(error)
    }
    res.status(200).json(savedRoom)
  } catch (error) {
    next(error)
  }
}

// UPDATE
export const updateRoom = async (req, res, next) => {
  try {
    const id = req.params.id
    const updatedRoom = await Room.findByIdAndUpdate(
      id,
      { $set: req.body},
      { new: true} // send back the data in updated version
    )
    res.status(200).json(updatedRoom)
  } catch (error) {
    next(error)
  }
}

// DELETE
export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid // hotel id
  const id = req.params.id //room id
  try {
    await Room.findByIdAndDelete(id)
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: id }
      })
    } catch (error) {
      next(error)
    }
    res.status(200).json('Room has been deleted.')
  } catch (error) {
    next(error)
  }
}

// GET
export const getRoom = async (req, res, next) => {
  try {
    const id = req.params.id
    const room = await Room.findById(id)
    res.status(200).json(room)
  } catch (error) {
    next(error)
  }
}

// GET ALL
export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find()
    res.status(200).json(rooms)
  } catch (error) {
    // res.status(500).json(error)
    next(error)
  }
}