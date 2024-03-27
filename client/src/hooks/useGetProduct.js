import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";

 export const useFetchItems =  () => {
    const [loading, setLoading] = useState(false);
    const [itemData, setItemData] = useState([]);
    const showToast = useShowToast();
useEffect(() => {
    const getItems = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/items/getitems");
        
        const data = await response.json();
        if(data.error){
            showToast('Error', data.error, 'error');
        }
        setItemData(data);
      } catch (error) {
        showToast('Error', "Error in fetching items", 'error');
      } finally {
        setLoading(false);
      }
    };
    getItems();
  }, []);

  return {itemData, loading,setItemData}
}