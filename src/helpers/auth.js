import { AUTH_HEADER_NAMES } from "../constants/general";

export const getAuthHeaders = () => ({
    [AUTH_HEADER_NAMES.PHONE]: localStorage.getItem(AUTH_HEADER_NAMES.PHONE),
    [AUTH_HEADER_NAMES.TOKEN]: localStorage.getItem(AUTH_HEADER_NAMES.TOKEN)
})

export const setAuthHeaders = (phoneNumber, loginToken) => {
    localStorage.setItem(AUTH_HEADER_NAMES.PHONE, phoneNumber),
    localStorage.setItem(AUTH_HEADER_NAMES.TOKEN, loginToken)
};

export const getIsLoggedInFlag = () => {
    return Boolean(localStorage.getItem(AUTH_HEADER_NAMES.PHONE));
}