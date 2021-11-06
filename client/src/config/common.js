const setProfileFromLocalStorage = (data) => {
    localStorage.setItem("profile", JSON.stringify(data));
}
const removeProfileFromLocalStorage = () => {
    localStorage.removeItem("profile");
}
const getProfileFromLocalStorage = (token) => {
    return JSON.parse(localStorage.getItem("profile"));
}


export {
    setProfileFromLocalStorage,
    getProfileFromLocalStorage,
    removeProfileFromLocalStorage
}