import Notes from "@/app/lib/models/notes";
import User from "@/app/lib/models/user";   
import connect from "@/app/lib/db";
import { Types } from "mongoose";
import { NextResponse } from "next/server";


export async function GET(req:Request,contex:{params:any}) {
    const noteId = contex.params.note;

    try{
        const {searchParams} = new URL(req.url)
        const userId = searchParams.get("userId")

        if(!userId){
            return NextResponse.json({message:"User ID not found"},{status:401})
        }

        if(!Types.ObjectId.isValid(userId) && !Types.ObjectId.isValid(noteId)){
            return NextResponse.json({message:"User id or note id is not valid"},{status:401})
        }

        await connect();
        const notes = await Notes.findOne({_id:noteId,user:userId})

        if(!notes){
            return NextResponse.json({message:"User not found"},{status:404})
        }
        return NextResponse.json({notes:notes},{status:201})

    }catch(error){
        return NextResponse.json({message:"error fetching notes"+error},{status:500})

    }
}