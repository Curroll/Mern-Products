  import { create } from "zustand";
  export const useProductStore = create((set)=>({
    products: [],
    setProducts: (products) => set({products}),
    createProduct: async (newProduct) => {
        // Validate that all fields are filled
        if (!newProduct.name || !newProduct.image || !newProduct.price) {
            return { success: false, message: "Please fill in all fields" };
        }
    
        try {
            // Sending the POST request to create the product
            const res = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newProduct),
            });
    
            // Check if the response is successful
            if (!res.ok) {
                throw new Error(`Error: ${res.status} - ${res.statusText}`);
            }
    
            const data = await res.json();
    
            // Check if the data structure is valid
            if (data && data.data) {
                set((state) => ({
                    products: [...state.products, data.data],
                }));
    
                return {
                    success: true,
                    message: "Product Created Successfully",
                };
            } else {
                throw new Error("Invalid data structure received");
            }
        } catch (error) {
            // Handle errors (e.g., network issues, server errors)
            console.error("Error creating product:", error);
    
            return {
                success: false,
                message: error.message || "An error occurred while creating the product",
            };
        }
    }
    ,
    fetchProducts: async () => {
        try {
          // Start loading state (if applicable)
          set({ loading: true });
      
          const res = await fetch("/api/products");
      
          // Check if the response is successful
          if (!res.ok) {
            throw new Error(`Error: ${res.status} - ${res.statusText}`);
          }
      
          const data = await res.json();
          
          // Check if the data structure is as expected
          if (data && data.data) {
            set({ products: data.data });
          } else {
            throw new Error("Invalid data structure received");
          }
        } catch (error) {
          // Handle errors (e.g., network issues, server errors)
          console.error("Error fetching products:", error);
          set({ error: error.message });
        } finally {
          // End loading state (if applicable)
          set({ loading: false });
        }
      },
    
    deleteProduct: async (pid) => {
        try {
          const res = await fetch(`/api/products/${pid}`, {
            method: "DELETE",
          });
      
          const data = await res.json();
      
          if (!res.ok || !data.success) {
            return { success: false, message: data.message || "Failed to delete product." };
          }
      
          set(state => ({
            products: state.products.filter(product => product._id !== pid)
          }));
      
          return { success: true, message: data.message };
        } catch (error) {
          console.error("Error deleting product:", error);
          return { success: false, message: "Something went wrong. Please try again." };
        }
      },
    
    updateProduct: async (pid, updatedProduct) => {
        const res = await fetch(`/api/products/${pid}`, {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(updatedProduct)
        });
      
        const data = await res.json();
      
        if (!data.success) {
          return {
            success: false,
            message: data.message
          };
        }
      
        set((state) => ({
          products: state.products.map((product) =>
            product._id === pid ? data.data : product
          )
        }));
      
        return {
          success: true,
          message: data.message
        };
      }
       
       
  })) ;  