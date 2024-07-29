import axios from "axios";

import { API_URL } from "../config";

export const getAuthToken = () => {
  return window.localStorage.getItem("auth_token");
};

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const setAuthHeader = (token) => {
  if (token !== null) {
    window.localStorage.setItem("auth_token", token);
  } else {
    window.localStorage.removeItem("auth_token");
  }
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

//------------------------category--------------------------

export const fetchProductCategories = async () => {
  try {
    const response = await axiosInstance.get("/sneakerCategory");
    return response.data;
  } catch (error) {
    console.log("Error fetching product Category", error);

    throw error;
  }
};

export const createProductcategory = async (
  categoryName,
  categoryDescription,
  categoryImage
) => {
  // Create a FormData object to send multipart/form-data
  const formData = new FormData();
  formData.append("categoryName", categoryName);
  formData.append("categoryDescription", categoryDescription);
  formData.append("categoryImage", categoryImage);

  try {
    // Send POST request to the backend endpoint
    const response = await axiosInstance.post(
      "/sneakerCategory/addCategory",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // return response.data

    // Handle successful response
    console.log("Category added successfully:", response.data);
  } catch (error) {
    // Handle errors
    console.error("Error adding category:", error);
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await axiosInstance.delete(`/sneakerCategory/delete${id}`);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateProductCategory = async(category)=>{

  const formData = new FormData()
  formData.append("categoryName", category.categoryName)
  formData.append("categoryDescription", category.categoryDescription)
  
  if(category.categoryImage){
    formData.append("categoryImage", category.categoryImage)
  }

  try{

    const response = await axiosInstance.put(`/sneakerCategory/update/${category.categoryId}`, formData, {
      headers:{
        'Content-Type':'multipart/form-data'
      }
    })

    return response.data

  }catch(error){
    throw error
  }

}


//------------------------subcategory--------------------------

export const fetchProductSubCategories = async () => {
  try {
    const response = await axiosInstance.get("/sneakerSubCategory");
    return response.data;
  } catch (error) {
    console.log("Error fetching product Sub Category", error);

    throw error;
  }
};

export const createSubProductcategory = async (
  subCategoryName,
  subCategoryDescription
) => {
  try {
    const response = await axiosInstance.post(
      "/sneakerSubCategory/addSubCategory",
      {
        subCategoryName: subCategoryName,
        subCategoryDescription: subCategoryDescription,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding subcategory:", error);
    throw error; // Handle or propagate the error as needed
  }
};

export const deleteSubCategory = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/sneakerSubCategory/delete${id}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateProductSubCategory = async (subCategory) => {
  const formData = new FormData();
  formData.append("subCategoryName", subCategory.subCategoryName);
  formData.append("subCategoryDescription", subCategory.subCategoryDescription);

  try {
    const response = await axiosInstance.put(`/sneakerSubCategory/update/${subCategory.subCategoryId}`, formData);
    return response.data;
  } catch (error) {
    throw error
  }
};

// -------------------------------brand----------------------

export const fetchProductBrand = async () => {
  try {
    const response = await axiosInstance.get("/sneakerBrand");
    return response.data;
  } catch (error) {
    console.log("Unable to fetch brand :", error);

    throw error;
  }
};

export const createProductBrand = async (
  brandName,
  brandDescription,
  brandImage
) => {
  // Create a FormData object to send multipart/form-data
  const formData = new FormData();
  formData.append("brandName", brandName);
  formData.append("brandDescription", brandDescription);
  formData.append("brandImage", brandImage);

  try {
    // Send POST request to the backend endpoint
    const response = await axiosInstance.post(
      "/sneakerBrand/addBrand",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          // Important for multipart/form-data requests
        },
      }
    );

    // Handle successful response
    console.log("Brand added successfully:", response.data);
  } catch (error) {
    // Handle errors
    console.error("Error adding brand:", error);
  }
};

export const updateProductBrand = async(brand)=>{

  const formData = new FormData()
  formData.append("brandName", brand.brandName)
  formData.append("brandDescription", brand.brandDescription)
  
  if(brand.brandImage){
    formData.append("brandImage", brand.brandImage)
  }

  try{

    const response = await axiosInstance.put(`/sneakerBrand/update/${brand.brandId}`, formData, {
      headers:{
        'Content-Type':'multipart/form-data'
      }
    })

    return response.data

  }catch(error){
    throw error
  }

}

export const deleteBrand = async (id) => {
  try {
    const response = await axiosInstance.delete(`/sneakerBrand/delete${id}`);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ------------------------size -------------------------

export const fetchProductSize = async () => {
  try {
    const response = await axiosInstance.get("/sneakerSize");

    return response.data;
  } catch (error) {
    console.log("Unable to fetch size ", error);
    throw error;
  }
};

export const addProductSizeServices = async (sizeName) => {
  try {
    const post = await axiosInstance.post("/sneakerSize/addSize", { sizeName });
    return post.data;
  } catch (error) {
    console.log("Unable to add size ", error);
    throw error;
  }
};

export const deleteSize = async (id) => {
  try {
    const response = await axiosInstance.delete(`/sneakerSize/delete${id}`);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ------------------product-----------------------

export const fetchProduct = async () => {
  try {
    const response = await axiosInstance.get("/sneaker");

    return response.data;
  } catch (error) {
    console.log("Unable to fetch product ", error);

    throw error;
  }
};

export const fetchProductById = async (productId) => {
  try {
    const response = await axiosInstance.get(`/sneaker/sneaker${productId}`);

    return response.data;
  } catch (error) {
    console.log("Unable to fetch product ", error);

    throw error;
  }
};

export const fetchSearchResults = async (searchQuery) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/products/search?query=${encodeURI(searchQuery)}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching search results", error);
    return []; // Return an empty array or handle the error as needed
  }
};

export const fetchProductByCategoryName = async (categoryName) => {
  try {
    const response = await axiosInstance.get(`/sneaker/category`, {
      params: { categoryName },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchProductByBrandName = async(brandName) =>{
  try{
    const response = await axiosInstance.get('/sneaker/brand', {
      params: {brandName},
    })

    return response.data
  }catch(error){
    throw error
  }
}

export const fetchRecommendedProduct = async (productId) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/product/${productId}`
    );

    console.log(response.data)
    return response.data;
    
  } catch (error) {
    console.error("Unable to fetch products: ", error);
    throw error;
  }
};

export const addProductService = async (product) => {
  const formData = new FormData();

  // Append fields to FormData
  formData.append("productName", product.productName);
  formData.append("productDescription", product.productDescription);
  formData.append("price", product.price.toString()); // Ensure price is converted to string if necessary
  if (product.discountPrice) {
    formData.append("discountPrice", product.discountPrice.toString());
  }
  formData.append("productCategory", product.productCategory);
  formData.append("productSubCategory", product.productSubCategory);
  formData.append("productBrand", product.productBrand);

  // Append productSize as an array
  product.productSizes.forEach((size) => {
    formData.append("productSizes", size);
  });
  formData.append("productColor", product.productColor)

  if (product.productImage) {
    formData.append("productImage", product.productImage);
  }

  try {
    // Send POST request with FormData
    const response = await axiosInstance.post("/sneaker/addProduct", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Unable to add product:", error);
    throw error; // Rethrow the error to propagate it up
  }
};

export const updateProductService = async (product) => {
  const formData = new FormData();

  formData.append("productName", product.productName);
  formData.append("productDescription", product.productDescription);
  formData.append("price", product.price.toString());
  if (product.discountPrice) {
    formData.append("discountPrice", product.discountPrice.toString());
  }
  formData.append("productCategory", product.productCategory);
  formData.append("productSubCategory", product.productSubCategory);
  formData.append("productBrand", product.productBrand);

  product.productSizes.forEach((size) => {
    formData.append("productSizes", size.sizeId);
  });
  formData.append("productColor", product.productColor)

  if (product.productImage) {
    formData.append("productImage", product.productImage);
  }

  try {
    // Send POST request with FormData
    const response = await axiosInstance.put(`/sneaker/update/product=${product.productId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await axiosInstance.delete(`/sneaker/delete${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ----------------------------------------------------------------  user ----------------------------------------------

// -------------------------------------------registre and login user -----------------------------------

export const registerUser = async (user) => {
  const formData = new FormData();
  formData.append("firstName", user.firstName);
  formData.append("lastName", user.lastName);
  formData.append("email", user.email);
  formData.append("password", user.password);
  try {
    const response = await axiosInstance.post("/user/register", formData);

    return response.data;
  } catch {
    console.log(error);
    throw error;
  }
};

export const loginUser = async (user) => {
  try {
    const response = await axiosInstance.post("/user/login", {
      email: user.email,
      password: user.password,
    });

    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error; // Rethrow the error for handling in the calling component
  }
};

export const fetchUser = async () => {
  try {
    const response = await axiosInstance.get("/user");

    return response.data;
  } catch {
    console.log(error);
    throw error;
  }
};

export const fetchAllUser = async () => {
  try {
    const response = await axiosInstance.get("/user/user_list");

    return response.data;
  } catch {
    console.log(error);
    throw error;
  }
};

export const getUserDetails = async () => {
  try {
    const authToken = getAuthToken(); // Retrieve the authentication token
    if (!authToken) {
      throw new Error("Authentication token not found");
    }

    const response = await axiosInstance.get(`/user/details`, {
      headers: {
        Authorization: `Bearer ${authToken}`, // Include JWT token in the Authorization header
      },
    });

    return response.data; // Assuming your backend returns JSON data
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};


export const updateUserDetails = async (user) => {
  const formData = new FormData();

  formData.append("firstName", user.firstName);
  formData.append("lastName", user.lastName);
  formData.append("email", user.email);
  formData.append("address", user.address);
  formData.append("phone", user.phone);

  if (user.userImage) {
    formData.append("userImage", user.userImage);
  }

  try {
    const response = await axiosInstance.put(`/user/update/${user.id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}


export const deleteuser = async(id)=>{
  try{
    const response = await axiosInstance.delete(`/user/delete${id}`)
    response.data
  }catch(eror){
    throw eror
  }
}



// ----------------------------add to cart------------

export const fetchCartItem = async(userId) =>{
  try{
    
    const response = await axiosInstance.get(`/cart/user${userId}`)
    console.log(response.data)
    return response.data

  }catch(error){
    throw error
  }
}

export const addToCart = async (productId, userId, quantity, sizeId) => {
  try {
      const response = await axiosInstance.post('/cart/add', null, {
          params: {
              productId,
              userId,
              quantity,
              sizeId
          }
      });
      return response.data
      
  } catch (error) {
      console.error('Error adding product to cart:', error.response ? error.response.data : error.message);
  }
};


export const removeItemfromCart = async (cartId) => {
  try {
    const response = await axiosInstance.delete(`/cart/remove${cartId}`);
    return response.data; // Assuming the response contains data you want to use
  } catch (error) {
    console.error('Error removing item from cart:', error);
    throw error; // Re-throw the error to propagate it further if needed
  }
};




// ------------------------------order--------------------------

export const fetchAllOrder = async()=>{

  try{

    const response = await axiosInstance.get("/order/list")
    return response.data

  }catch(error){
    throw error
  }

}

export const fetchOrderItem = async(userId) =>{
  try{

    const response = await axiosInstance.get(`/order/user/${userId}`)

    return response.data
    
  }catch(error){
    throw error
  }
}


export const removeItemFromOrder = async(orderId)=>{


  try{
    const response = await axiosInstance.delete( `/order/delete${orderId}`)

    return response.data
  }catch(error){
    throw error
  }

}


export const addOrder = async(userId, productId, sizeId, quantity)=>{

  try{

    const response = await axiosInstance.post("/order/addOrder", null, {
      params:{
        userId,
        productId,
        sizeId,
        quantity
      }
    })

    return response.data

  }catch(error){
    throw error
  }

}




//----------------------------admin--------------------

/*   register and login admin  */


export const registerAdmin = async(admin)=>{
  const formData = new FormData();
  formData.append("firstName", admin.firstName)
  formData.append("lastName", admin.lastName)
  formData.append("email", admin.email)
  formData.append("password", admin.password)

  try{

    const response = await axiosInstance.post("/admin/register", formData);

    return response.data

  }catch(error){

    throw error

  }
}

export const getAllAdmin = async() =>{
  try{

    const response  = await axiosInstance.get("/admin/admin_list")

    return response.data

  }catch(error){
    throw error
  }
}

export const deleteAdmin = async(id)=>{

  try{
    const response = await axiosInstance.delete(`/admin/delete${id}`)
    return response.data
  }catch(error){
    throw error
  }

}

export const updateAdmin = async (admin) => {
  const formData = new FormData();
  formData.append("firstName", admin.firstName);
  formData.append("lastName", admin.lastName);
  formData.append("fullName", admin.fullName || `${admin.firstName} ${admin.lastName}`);
  formData.append("email", admin.email);
  formData.append("address", admin.address);
  formData.append("phone", admin.phone);
  formData.append("role", admin.role);
  formData.append("status", admin.status);

  if (admin.image) {
    formData.append("image", admin.image);
  }

  try {
    const response = await axiosInstance.put(`/admin/update/${admin.id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });

    return response.data;
  } catch (error) {
    console.error("Failed to update admin:", error);
    throw error;
  }
}

export const loginAdmin = async (admin) => {
  try {
    const response = await axiosInstance.post("/admin/login", {
      email: admin.email,
      password: admin.password,
    });

    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error; // Rethrow the error for handling in the calling component
  }
};



export default axiosInstance;



