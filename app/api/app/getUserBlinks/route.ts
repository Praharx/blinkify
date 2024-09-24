import {prisma} from "@/lib/utils"
import { verifyToken } from "@clerk/nextjs/server"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
const CLERK_JWT_KEY = process.env.NEXT_PUBLIC_CLERK_JWT_KEY;

export const GET = async (req: Request) => {
    const cookieStore = cookies()
    const sessToken = cookieStore.get('__session')?.value
    const authorization = req.headers.get("Authorization");
    const token = sessToken || authorization
    if (!authorization) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!token) {
        return Response.json({ error: 'Token not found. User must sign in.' }, { status: 401 })
    }

    try {
        await verifyToken(token, {
          jwtKey: CLERK_JWT_KEY,
          authorizedParties: ["http://localhost:3000","https://main.blinkify.pages.dev"], // Replace with your authorized parties
        })

      } catch (error) {
        console.log(error,"::::::ERROR");
        return Response.json({ error: 'Token not verified.' }, { status: 401 })
    }


    const userId = await req.headers.get("userId")
    const response = await prisma.blink.findMany({
        where: {
            userId: userId as string
        }
    })
    if (response){
        return NextResponse.json({
            success: true,
            data: response
        })
    }
    return NextResponse.json({
        message: "No blinks found"
    })
}