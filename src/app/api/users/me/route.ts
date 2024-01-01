import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel"
import { connect } from "@/dbconfig/dbConfig";

connect()
 
export async function GET(request:NextRequest){
    try {
        const userId=await getDataFromToken(request)
        // console.log(userId);
        
        const user=await User.findOne({_id:userId}).select("-password");  
        console.log(user);
        
        return NextResponse.json({
            message: "user found",
            data:user
        })
    } catch (error:any) {
        return NextResponse.json({ error: error.message },{status:400});
    }
}