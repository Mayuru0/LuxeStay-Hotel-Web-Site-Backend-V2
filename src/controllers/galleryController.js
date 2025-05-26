import Gallary from "../models/galleryModel.js";


export const createGalleryItem =async (req, res) => {
  
  const user =req.user
  if(user ==null){
    return res.status(404).json({
      success: false,
      message: "please login first",
    });
  }
  // else if(user.type !=="admin"){
  //   return res.status(404).json({
  //     success: false,
  //     message: "You are not admin",
  //   });
  // }


    const galleryItem = req.body;

    const newGalleryItem = new Gallary(galleryItem);
    try {
        await newGalleryItem.save();
         res.status(201).json({
      success: true,
      message:"Galley Item Created successfully ",
      data: newGalleryItem,
    });
    } catch (error) {
        res.status(500).json({
      success: false,
      message: "Error registering user",
      error: error.message,
    });
    }
}


export const getGalleryItems =async (req, res) => {
    try {
        const galleryItems = await Gallary.find();

        if(galleryItems.length === 0){
            return res.status(200).json({
                success: true,
                message: "No gallery items found",
                data: [],
            });
        }
        res.status(200).json({
      success: true,
      data: galleryItems,
    });
    } catch (error) {
        res.status(500).json({
      success: false,
      message: "Failed to fetch gallery items",
      error: error.message,
    });
    }
}