export const fetchData = async (route, elementsName) => {
    try {
           const response = await fetch(route, { 
               method:'GET',
               headers: {
                   'content-type': 'application/json'    
               }
           });

           if (!response.ok) {
               throw new Error("Couldn't retrieve list of " + elementsName);
           }
       
           const res = await response.json();

           return res;

       } catch (error) {
           console.log("An error happened fetching the list of " + elementsName, error);
       }
}

export const fetchInternalData = async (route, elementsName) => {
     try {
            const response = await fetch(route, { 
                method:'GET',
                headers: {
                    'content-type': 'application/json'    
                }
            });

            if (!response.ok) {
                throw new Error("Couldn't retrieve list of" + elementsName);
            }
        
            const res = await response.json();

            const dataList = res.data[elementsName]; 

            return dataList;

        } catch (error) {
            console.log("An error happened fetching the list of " + elementsName, error);
        }
}


