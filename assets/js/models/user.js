let session = sessionStorage.getItem("oshare_designs_session") ? true : false;

export let userData = {

    //state for session
    isSessionSet : session,

    //most used attributes
    name : "",
    surname : "",
    email : "",
    profileImage : "",
    cart : [],
    phone : "",
    city : "",
    region : "",
    country : ""
}