export const postFetch = async (route, data) => {
    try {
        const response = await fetch(route, { 
            method:'POST',
            headers: {
                'content-type': 'application/json'    
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Couldn't send post request! HTTP error! Status: ${response.status}`);
        }
    
        const res = await response.json();

        return res;

    } catch (error) {
        console.log("An error happened sending the post request");
    }
}

export const deleteFetch = async (route) => {
    try {
        const response = await fetch(route, { 
            method:'DELETE',
            headers: {
                'content-type': 'application/json'    
            }        
        });

        if (!response.ok) {
            throw new Error(`Couldn't send delete request! HTTP error! Status: ${response.status}`);
        }

        return response;

    } catch (error) {
        console.log("An error happened sending the delete request");
    }
}