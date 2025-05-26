import Category from "../models/category.js";


export const createCategory =  async (req, res) => {
    const category =req.body;
   
    const newCategory =new Category(category);

    try{
        await newCategory.save();
        res.status(201).json({
            success: true,
            message:"Category Created successfully ",
            data: newCategory,
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Failed to create category",
            error: error.message,
        });
    }
}



export const getCategories =async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            success: true,
            data: categories,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch categories",
            error: error.message,
        });
    }
}


export const updateCategory =async (req, res) => {
    try {
        const category = await Category.findById(req.params.categoryId);   
        
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }
        category.name = req.body.name || category.name;
        category.price = req.body.price || category.price;
        category.features = req.body.features || category.features;
        category.description = req.body.description || category.description;
        category.image = req.body.image || category.image;
        const updatedCategory = await category.save();
        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: updatedCategory,
        });
        

    }catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update category",
            error: error.message,
        });
    }    
}



export const getCategoriesByName = async (req, res) => {
    try {
        const category = await Category.find({ name: req.params.name });

        res.status(200).json({
            success: true,
            data: category,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch categories",
            error: error.message,
        });
    }
};



export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.CategoryId);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        res.status(200).json({
            success: true,
            data: category,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch category",
            error: error.message,
        });
    }
};


export const deleteCategory =async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.categoryId);
        res.status(200).json({
            success: true,
            message: "Category deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete category",
            error: error.message,
        });
    }
}