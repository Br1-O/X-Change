let session = sessionStorage.getItem("x_change_session") ? true : false;

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