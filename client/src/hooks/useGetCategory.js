import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";

export const useFetchCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const showToast = useShowToast();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/items/getcategory');
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        } else {
          setCategories(data); // Set categories in state
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        showToast("Error", 'Failed to fetch categories', "error");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [showToast]); 

  return { categories, loading }; // Return categories and loading state to the component
};
