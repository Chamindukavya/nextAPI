import Notes from "@/app/lib/models/notes";
import User from "@/app/lib/models/user";   
import connect from "@/app/lib/db";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req: Request){
    try{

        const {searchParams} = new URL(req.url)
        const userId = searchParams.get("userId")

        if(!userId){
            return NextResponse.json({message:"User ID not found"},{status:401})
        }

        if(!Types.ObjectId.isValid(userId)){
            return NextResponse.json({message:"User ID is not valid"},{status:401})
        }
        await connect();
        const notes = await Notes.find({user:userId})

        if(!notes){
            return NextResponse.json({message:"User not found"},{status:404})
        }
        
        return NextResponse.json({notes:notes},{status:201})
    }catch(error){
        
    }
}

export async function POST(req:Request){

    try{

        const {title,description} = await req.json();

        const {searchParams} = new URL(req.url)
        const userId = searchParams.get("userId")

        const data = {
            title:title,
            description:description,
            user:userId
        }

        await connect();

        const newNote = new Notes(data);
        newNote.save()

        if(!newNote){
            return NextResponse.json({message:"Unable to add new note"},{status:401})
        }
        return NextResponse.json({message:"new note added"},{status:201})
    }catch(error){
        return NextResponse.json({message:"error adding notes"+error},{status:500})

    }
}