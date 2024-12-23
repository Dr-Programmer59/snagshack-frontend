
import axios from 'axios'
import { ForgotUserFai, ForgotUserReq, ForgotUserSuc, LoadUserFai, LoadUserReq, LoadUserSuc, LoginUserFai, LoginUserReq, LoginUserSuc, LogoutUserFai, LogoutUserReq, LogoutUserSuc, OTPUserFai, OTPUserReq, OTPUserSuc, PrayingFai, PrayingReq, PrayingSuc, RegisterUserFai, RegisterUserReq, RegisterUserSuc, ResterUserFai, ResterUserSuc, UpdateUserFai, UpdateUserReq, UpdateUserSuc, createAdsFai, createAdsReq, createAdsSuc, getAdsFai, getAdsReq, getAdsSuc } from '../ActionType';

const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1`,
    withCredentials: true
});
export const fetchEmail=async()=>{
    let res=await api.get("/get-coupan")
    console.log(res)
    if(res.data.coupan){
        return res.data.coupan.email;
    }
    

}

export const updateSubscription = async (session_id) => {
    try {
      
        let res = await api.post(`/update-subscription`,{session_id});
        if (res) {
            console.log("ok done");
            return true

        }
        return false
    } catch (error) {
        console.error("Error updating subscription:", error);
        return false

    }
};
export const login = (email,password) => async (dispatch) => {
    try {
        dispatch({
            type: LoginUserReq,
        })
        console.log(email,password)
        const {data} = await api.post('/login',{email,password});
        dispatch({
            type: LoginUserSuc,...data
        })
        return true
    } catch (error) {
        dispatch({
            type: LoginUserFai,
            message: error?.response?.data?.message
        })
        return false
    }
}


export const register = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: RegisterUserReq,
        })

        const {data} = await api.post('/register',formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        dispatch({
            type: RegisterUserSuc,...data
        })
        return true
    } catch (error) {
        dispatch({
            type: RegisterUserFai,
            message: error?.response?.data?.message
        })
        return false
    }
}

export const verifyOTP = (OTP) => async (dispatch) => {
    try {
        dispatch({
            type: OTPUserReq,
        })

        const {data} = await api.post('/verify-otp',{OTP});
        dispatch({
            type: OTPUserSuc,...data
        })
        return true
    } catch (error) {
        dispatch({
            type: OTPUserFai,
            message: error?.response?.data?.message
        })
        return false
    }
}

export const loadme = () => async (dispatch) => {
    try {
        dispatch({
            type: LoadUserReq,
        })

        const {data} = await api.get('/me');
        dispatch({
            type: LoadUserSuc,...data
        })
    } catch (error) {
        dispatch({
            type: LoadUserFai
        })
    }
}


export const logout = () => async (dispatch) => {
    try {
        dispatch({
            type: LogoutUserReq,
        })

        const {data} = await api.get('/logout');
        dispatch({
            type: LogoutUserSuc,...data
        })
        return true
    } catch (error) {
        dispatch({
            type: LogoutUserFai,
            message: error?.response?.data?.message
        })

    }
}

export const forgot = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: ForgotUserReq,
        })

        const {data} = await api.post('/forgot-password',formData);
        console.log(data)
        dispatch({
            type: ForgotUserSuc,...data
        })
        return true
    } catch (error) {
        console.log(error)
        dispatch({
            type: ForgotUserFai,
            message: error?.response?.data?.message
        })
       
        return false
    }
}

export const reset = (token,formData) => async (dispatch) => {
    try {
        dispatch({
            type: RegisterUserReq,
        })

        const {data} = await api.put(`/reset-password/${token}`,formData);
        dispatch({
            type: ResterUserSuc,...data
        })
        return true
    } catch (error) {
        dispatch({
            type: ResterUserFai,
            message: error?.response?.data?.message
        })
        return false
    }
}

export const changePassword = (formData) => async (dispatch) => {
    try {
       
        
        const {data} = await api.put(`/user/change-password`,formData);
        if(data){
            return true

        }
        else{
            return false
        }
    } catch (error) {
      return false
    }
}

export const updateUser = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: UpdateUserReq,
        })

        const {data} = await api.put('/user/update',formData);
        dispatch({
            type: UpdateUserSuc,...data
        })
        return true
    } catch (error) {
        dispatch({
            type: UpdateUserFai,
            message: error?.response?.data?.message
        })
        return false
    }
}



