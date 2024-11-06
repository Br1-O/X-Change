export const setLocalData = (key, value) => {
    localStorage.setItem(key, value);
}

export const getLocalData = (key) => {
    return localStorage.getItem(key);
}

export const freeLocalData = (key) => {
    localStorage.removeItem(key);
}

export const searchInLocalStorage = (searchKey) => {
    
    for (let index = 0; index < localStorage.length; index++) {

        if (localStorage.key(index) === searchKey){
            return localStorage.getItem(searchKey);
        }
    }

    return null;
}

export const searchUserInLocalStorage = (email) => {

    //check if oshare_designs object already exists in localstorage
    let oshareLocal = searchInLocalStorage("oshare_designs");

    //parse the JSON into a Js object
    oshareLocal = JSON.parse(oshareLocal);

    //iterate through users in the object
    for (const user of oshareLocal.users) {
        //check if email exists
        if (user.email == email) {
            return user;
        }
    };

    //if no user is found, return null
    return null;
}

export const updateAccountData = (userData) => {

    //check if user is logged in
    if (userData.isSessionSet) {
        
        //get user's data from local storage
        let userLocalData = searchUserInLocalStorage(userData.email);

        //set user's data as user temporary object's data
        userLocalData.name = userData.name;
        userLocalData.surname = userData.surname;
        userLocalData.email = userData.email;
        userLocalData.profileImage = userData.profileImage;
        userLocalData.phone = userData.phone;
        userLocalData.city = userData.city;
        userLocalData.region = userData.region;
        userLocalData.country = userData.country;
        userLocalData.cart = userData.cart;

        //check if oshare_designs object already exists in localstorage
        let oshareLocal = searchInLocalStorage("oshare_designs");
        
        //parse the JSON into a Js object
        oshareLocal = JSON.parse(oshareLocal);

        //iterate through users in the object
        oshareLocal.users.forEach( (user, i) => {
            //check if email exists
            if (user.email == userLocalData.email) {

                //update that user's data with the current data
                oshareLocal.users[i] = userLocalData;

            }
        });

        //update the local storage db with the updated user
        setLocalData("oshare_designs", JSON.stringify(oshareLocal));
        
        return true;
    }

    return false;
}