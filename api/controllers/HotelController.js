import Hotel from "../models/HotelModel.js"
import { createError } from "../utils/error.js"
import mongoose from "mongoose"

// CREATE HOTEL
export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body)
  try {
    const savedHotel = await newHotel.save()
    res
    .status(200)
    .json(savedHotel)
  } catch (error) {
    next(error)
  }
}

// UPDATE HOTEL BY ID
export const updateHotel = async (req, res, next) => {
  // const id = req.params.id // this works as well
  const { id } = req.params // this works as well
  try {
    if(!mongoose.Types.ObjectId.isValid(id)) {
      next(createError(404, 'No id found!'))
    }

    // this works as well
    // const updatedHotel = await Hotel.findByIdAndUpdate(
    //   id,
    //   { $set: req.body},
    //   { new: true} // send back the data in updated version
    // )

    // this works as well
    const updatedHotel = await Hotel.findOneAndUpdate({ _id: id }, {...req.body}, { new: true})

    if(!updatedHotel) {
      res
      .status(404)
      .json({err: 'no data found'})
    }

    res
    .status(200)
    .json(updatedHotel)
  } catch (error) {
    next(error)
  }
}

// DELETE BY ID
export const deleteHotel = async (req, res, next) => {
  const id = req.params.id
  try {
    if(!mongoose.Types.ObjectId.isValid(id)) {
      // return res.status(404).json({msg: 'No id found!'})
      next(createError(404, 'No id found!'))
    }
    
    // const deletedHotel = await Hotel.findByIdAndDelete(id)
    // res.status(200).json(deletedHotel)

    const deletedHotel = await Hotel.findByIdAndDelete(id)

    if(!deletedHotel) {
      res.status(404).json('No data to found')  
    }

    res.status(200).json(deletedHotel)
  } catch (error) {
    next(error)
  }
}

// GET SINGLE HOTEL
export const getHotel = async (req, res, next) => {
  const id = req.params.id
  try {
    // const { id } = req.params // this also works as well
    if(!mongoose.Types.ObjectId.isValid(id)) {
      // return res.status(404).json({msg: 'No id found!'})
      next(createError(404, 'No id found!'))
    }

    const hotel = await Hotel.findById(id)

    res
    .status(200)
    .json(hotel)
  } catch (error) {
    next(error)
  }
}

// GET ALL HOTELS WITH ANY PARAMETERS
export const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query 
  try {
    const hotels = await Hotel
    .find({
      ...others, 
      cheapestPrice: { $gt: min | 1, $lte: max || 999 }
    })
    .limit(req.query.limit)
    .sort({createdAt: -1}) // (-1 = desc, 1 = asc)
    res
    .status(200)
    .json(hotels)
  } catch (error) {
    next(error)
  }
}

// GET DATA BY CITY COUNT
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(',')
  try {
    const list = await Promise.all(cities.map(city => {
      return Hotel.countDocuments({city: city})
    }))
    res.status(200).json(list)
  } catch (error) {
    // res.status(500).json(error)
    next(error)
  }
}

// GET DATA BY TYPE AND COUNT
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({type: 'hotel'})
    const apartmentCount = await Hotel.countDocuments({type: 'apartment'})
    const resortCount = await Hotel.countDocuments({type: 'resort'})
    const villaCount = await Hotel.countDocuments({type: 'villa'})
    const cabinCount = await Hotel.countDocuments({type: 'cabin'})

    res.status(200).json([
      {type: 'hotel', count: hotelCount},
      {type: 'apartment', count: apartmentCount},
      {type: 'resort', count: resortCount},
      {type: 'villa', count: villaCount},
      {type: 'cabin', count: cabinCount}
    ])
  } catch (error) {
    // res.status(500).json(error)
    next(error)
  }
}