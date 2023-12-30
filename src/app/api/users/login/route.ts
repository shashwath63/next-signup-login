import { connect } from "@/dbconfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqbody = await request.json();
    const { email, password } = reqbody;
    console.log(reqbody);
    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "user not found" }, { status: 400 });
    }

    //check if password exists
    const validatePassword = await bcryptjs.compare(password, user.password);
    if (!validatePassword) {
      return NextResponse.json(
        { error: "password not valid" },
        { status: 400 }
      );
    }
    //create token data
    const tokenData = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    //create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1h",
    });
    const response = NextResponse.json({
      message: "login successful",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
