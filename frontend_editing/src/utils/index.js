import {jwtDecode}  from "jwt-decode"

export const token_decode = (token)=>{
   if(token){
    const decode_data = jwtDecode(token)
    const expireTime = new Date(decode_data.exp * 1000)
    // console.log(decode_data)

    if( new Date() > expireTime){
        localStorage.removeItem('Editro_token')
        return ""
    }else{
        return decode_data
    }
   }else{
    return ""
   }
}