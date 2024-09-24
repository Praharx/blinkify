import {prisma} from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    const {id}:{id:string} = await req.json();
    const blink = await prisma.blink.findUnique({
        where: {
            id: id
        }
    })
    if (!blink) {
        return NextResponse.json({error: "Blink not found"}, {status: 404})
    }
    try {
        await prisma.blink.update({
            where: {
                id: id
            },
            data: {
                isVerified: true
            }
        })
    }catch(err){
        console.log("Bounty not verified!")
        return NextResponse.json({error: "Bounty not verified!"}, {status: 500})
    }
    
    return NextResponse.json({blink, success: true}, {status: 200})
}