import { prisma } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async () => {
    const response = await prisma.blink.findMany({
        where:{
            isVerified: false
        },
        select:{
            id: true,
            userId: true,
            blinkName: true,
            imagePreview: true
        }
    })
    if (response){
        return NextResponse.json({
            success: true,
            data: response
        })
    }
    return NextResponse.json({
        success: false,
        message: "No bounties found"
    })
}