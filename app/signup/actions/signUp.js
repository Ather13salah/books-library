'use server';
import { redirect } from "next/navigation";
export  async function signup(previous, formData){
    const username = formData.get('username')
    const password = formData.get('password')
    const email = formData.get('email')

    if(username === '' || password == '' || email === ''){
        return{error:'Please fill all  the inputs'}
    }
    if (password.length < 8){
        return{error:'Password at least has 8 characters'}
    }
    const request = await fetch('https://library-m2k0.onrender.com/auth/signup',{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            name:username,
            password:password,
            email:email
        })
    })

    const response = await request.json()
    
    if (response.error){
        return response  
    }
    
    redirect('/')
   

}