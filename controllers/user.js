import {User} from "../models/user.js"
import bcrypt from "bcrypt"
import { sendCookie } from "../utils/features.js"
import ErrorHandler from "../middlewares/error.js"


export const getAllUsers = async(req , res) => {

    // User.find({name : "Karan"})  // It find the entry where name is Karan
    const users = await User.find({})

    const keyboard = req.query.keyboard
    console.log(keyboard)

    res.json({
        success : true , 
        users,
    })
}

// Only async functions need try-catch block
export const login = async(req , res , next) => {
    try {
        const {email , password} = req.body // taking name,email,password from body
        let user = await User.findOne({email}).select("+password")
    
        if (!user){
            return next(new ErrorHandler("Invalid email or password" , 400))   // <- Error Handling
        }
        
        // if (!user)
        // return res.status(404).json({
        //     success : false,
        //     message : "Invalid email or password",
        // });
    
        const isMatch = await bcrypt.compare(password , user.password)
      
        if (!isMatch)
        return res.status(404).json({
            success : false,
            message : "Invalid email or password",
        });
    
        sendCookie(user , res , `Welcome Back , ${user.name}` , 200)
    } catch (error) {
        next(error)
    }
}




export const logout = (req , res) => {
    res
    .status(200)
    .cookie("token" , "" , 
    {expires : new Date(Date.now()),
        sameSite : process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure : process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
        success : true,
        user : req.user,
    })
}



export const register = async(req , res) => {
try {
    const {name , email , password} = req.body // taking name,email,password from body
    let user = await User.findOne({email}) // finding user through email


    if(user){
        return next(new ErrorHandler("User already exists" , 404))   // <- Error Handling
    }

//     if (user){
//     return res.status(404).json({
//         success : false,
//         message : "User already exists",
//     });
// }

    const hashPassword = await bcrypt.hash(password , 10)

    user = await User.create({name , email , password : hashPassword})

    sendCookie(user , res , "Registered Successfully" , 201)


    // // User.find({name : "Karan"})  // It find the entry where name is Karan
    //     const {name , email , password} = req.body

    //     await User.create({
    //     name,
    //     email,
    //     password,
    // })

    // // res.json({
    // //     success : true , 
    // //     message : "Registered Successfully",
    // // })

    // res.status(201).cookie("key-cookie" , "value-cookie").json({
    //     success : true , 
    //     message : "Registered Successfully",
    // })
} catch (error) {
    next(error)
}

};


// export const specialFunc = (req , res) => {
//     res.json({
//         success : true,
//         message : "Just Joking",
//     })
// }


export const getMyProfile = async (req , res) => {
    
    res.status(200).json({
        success : true,
        user : req.user,
    })
}


// export const updateUser = async (req , res) => {
//     const {id} = req.params
//     const user = await User.findById(id)

//     res.join({
//         success : true,
//         message : "Updated",
//     })
// }

// export const deleteUser = async(req , res) => {
//     const {id} = req.params
//     const user = await User.findById(id)

//     res.join({
//         success : true,
//         message : "Deleted",
//     })
// }