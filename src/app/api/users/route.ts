import connect from "@/app/lib/db";
import { NextResponse } from "next/server";
import User from "@/app/lib/models/user";



export async function GET(req: Request) {
    try{

        await connect();
        const users = await User.find();
        return new NextResponse(JSON.stringify(users), {status:200});

    }catch(error)
    {
        return new NextResponse("Error fetching users"+ error, {status:500});
    }
}