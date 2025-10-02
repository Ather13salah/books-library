'use server';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export  async function login(previous, formData){
    const username = formData.get('username')
    const password = formData.get('password')

    if(username === '' || password == ''){
        return{error:'Please fill all  the inputs'}
    }
    if (password.length < 8){
        return{error:'Password at least has 8 characters'}
    }
    const request = await fetch('http://localhost:8000/auth/login',{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            name:username,
            password:password
        })
    })

    const response = await request.json()
    
    if (response.error){
        return response  
    }
    const Cookies = await cookies()
    Cookies.set('token',response.acsses_token,{
        httpOnly:true,
        secure:true,
        path:"/",
        maxAge:60 * 60
    })

     Cookies.set('refresh_token',response.refresh_token,{
        httpOnly:true,
        secure:true,
        path:"/",
        maxAge:30 * 24 * 60 * 60
    })

    Cookies.set('user_id',response.id,{
        httpOnly:false,
        secure:true,
        path:"/",
        maxAge:30 * 24 * 60 * 60
    })


    redirect('/')

}