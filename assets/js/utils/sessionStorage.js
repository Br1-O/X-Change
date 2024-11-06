export const setSessionData = (key, value) => {
    sessionStorage.setItem(key, value);
}

export const getSessionData = (key) => {
    return sessionStorage.getItem(key);
}

export const freeSessionData = (key) => {
    sessionStorage.removeItem(key);
}

export const setUserDataFromSessionData = (userData) => {

    //set user object base on sessionStorage
    if (getSessionData("oshare_designs_session")) {

        let sessionData = JSON.parse(getSessionData("oshare_designs_session"));

        //set user object
        userData.name = sessionData.name;
        userData.surname = sessionData.surname;
        userData.email = sessionData.email;
        userData.profileImage = sessionData.profileImage;
        userData.cart = sessionData.cart;
        userData.phone = sessionData.phone;
        userData.city = sessionData.city;
        userData.region = sessionData.region;
        userData.country = sessionData.country;

        //change session state
        userData.isSessionSet = true;
    }

    return getSessionData("oshare_designs_session");
}

export const modifySessionCart = (userData = {}) => {

    //check if user is logged
    if (userData.isSessionSet) {

        //get session cart
        let currentSession = (JSON.parse(getSessionData("oshare_designs_session")));

        //set session's cart to user object's cart
        currentSession.cart = userData.cart;

        //update session's data
        currentSession = JSON.stringify(currentSession);
        setSessionData("oshare_designs_session", currentSession);
    }
}

