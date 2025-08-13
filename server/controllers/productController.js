import { v2 as cloudinary } from 'cloudinary'
import productModel from '../models/productModels.js'

// add product function
const addProduct = async (req, res) => {

  try {

    const { name, description, price, category, subCategory, sizes, bestseller, date } = req.body;

    // checking name with category and subcategory if existing on the product
    const exist = await productModel.findOne({
      name,
      category,
      subCategory
    });
    if (exist) {
      return res.json({ success: false, message: "Product already exist with the same category and sub category" })
    }


    // if image1 is available in the file then store it to image variable
    const image1 = req.files.image1 && req.files.image1[0]
    const image2 = req.files.image2 && req.files.image2[0]
    const image3 = req.files.image3 && req.files.image3[0]
    const image4 = req.files.image4 && req.files.image4[0]

    // filter out any undefined images so only uploaded ones remain
    const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

    // upload images to cloudinary and store their secure URLs
    let imagesUrl = await Promise.all(
      images.map(async (image) => {
        let result = await cloudinary.uploader.upload(image.path, { resource_type: 'image' })
        return result.secure_url
      })
    )

    // Prepare product data to save in the database
    const productData = {
      name,
      description,
      category,
      price: Number(price), // convert the price string to number
      subCategory,
      bestseller: bestseller === "true" ? true : false, // convert the string to bollean
      sizes: JSON.parse(sizes), // convert json to array
      image: imagesUrl,
      date: Date.now()
    }


    //console.log(productData)
    console.log(productData);
    console.log(sizes)

    // Create a new product document and save to DB
    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product Added" }

    )
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error })

  }

}

// function for list product
const listProduct = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await productModel.find({});
    res.json({ success: true, products })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error })
  }

}

// delete product
const removeProduct = async (req, res) => {
  try {

    // Delete product by its ID
    await productModel.findByIdAndDelete(req.body.id)
    res.json({ success: true, message: "Product Remove" })

  } catch (error) {
    console.log(error)
    res.json({ success: false, messge: error })
  }
}

// function for single product
const singleProduct = async (req, res) => {
  try {
    //const productId = req.body.id
    // Extract productId from request body
    const { productId } = req.body
    // Find product by ID
    const product = await productModel.findById(productId)

    res.json({ success: true, message: product })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error })
  }
}

export { addProduct, listProduct, removeProduct, singleProduct }