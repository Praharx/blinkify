
import {prisma} from "@/lib/utils";
import { verifyToken } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
const CLERK_JWT_KEY = process.env.NEXT_PUBLIC_CLERK_JWT_KEY;
interface SelectedOptions {
    content: string;
    type: string;
    options?: string[];
  }

export const POST = async (req: NextRequest) => {
    const { blinkName, blinkDescription, imagePreview, submitText, amount, buttonTypes }: {
        blinkName: string;
        blinkDescription: string;
        imagePreview: string;
        submitText: string;
        amount: number;
        buttonTypes: SelectedOptions[];
    } = await req.json();
    const cookieStore = cookies()
    const sessToken = cookieStore.get('__session')?.value
    const bearerToken = req.headers.get('Authorization')?.replace('Bearer ', '')
    const token = sessToken || bearerToken

    
    const authorization = req.headers.get("Authorization");
    if (!authorization) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await verifyToken(token as string, {
          jwtKey: CLERK_JWT_KEY,
          // TODO: Change this to the actual URL of your application
          authorizedParties: ["http://localhost:3000","https://main.blinkify.pages.dev"], // Replace with your authorized parties
        })

      } catch (error) {
        console.log(error,"::::::ERROR");
        return Response.json({ error: 'Token not verified.' }, { status: 401 })
    }

    


}
