export const getUserInfo = async(user_id) =>{
    const request = await fetch(`http://localhost:8000/auth/user_info?user_id=${user_id}`,{
        method:"GET",
        credentials:"include"
    })

    const response = await request.json()
    if(response.error){
        return response
    }
    return response
}