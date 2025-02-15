import connect from "@/app/lib/db";
import { NextResponse } from "next/server";
import User from "@/app/lib/models/user";
import { Types } from "mongoose";

export async function GET() {
    try{

        await connect();
        const users = await User.find();
        return NextResponse.json({data: users}, {status:200});

    }catch(error)
    {
        return NextResponse.json({message:"Error fetching users"+ error} ,{status:500});
    }
}


export async function POST(req: Request) {
    try{
        await connect();

        const body = await req.json();

        const newUser = new User(body);
        await newUser.save();

        return NextResponse.json({message:"user created successfully", user:newUser},{status:201})
        

    }catch(error)
    {
        return NextResponse.json({message:"error creating user",error},{status:500})
    }
}

export async function PATCH(req:Request){
    try{

        await connect();
        const {userId , newUserName} = await req.json();

        if(!userId || !newUserName){
            return NextResponse.json({message:"Enter userId or newUserName"},{status:401})
        }

        if(!Types.ObjectId.isValid(userId)){
            return NextResponse.json({message:"Invalid user id"},{status:401})
        }
        
        const updatedUser = await User.findByIdAndUpdate(
            {_id:userId},
            {userName:newUserName}
        )

        if(!updatedUser){
            return NextResponse.json({message:"unable to find user id"},{status:401})
            
        }

        return NextResponse.json({message:"user name updated"},{status:201})
         
    }catch(error){
        return NextResponse.json({message:"error updating user",error},{status:500})

    }
}


export async function DELETE(req:Request){
    try{

        await connect();
        const {searchParams} = new URL(req.url)
        const userId = searchParams.get("userId")

        if(!userId){
            return NextResponse.json({message:"Enter userId"},{status:401})
        }

        if(!Types.ObjectId.isValid(userId)){
            return NextResponse.json({message:"Invalid user id"},{status:401})
        }
        
        const updatedUser = await User.findByIdAndDelete(
            {_id:userId}
        )

        if(!updatedUser){
            return NextResponse.json({message:"unable to find user id"},{status:401})
            
        }

        return NextResponse.json({message:"user name updated"},{status:201})
         
    }catch(error){
        return NextResponse.json({message:"error updating user",error},{status:500})

    }
}


