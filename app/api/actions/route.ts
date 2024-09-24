import {prisma} from "@/lib/utils"
import { NextRequest, NextResponse } from "next/server";
import { clusterApiUrl, Connection, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { ActionGetResponse, ActionPostRequest, ActionPostResponse, ACTIONS_CORS_HEADERS, ActionParameter, ActionParameterType, LinkedAction } from "@solana/actions";

export async function GET(req: NextRequest, res: NextResponse) {
    const {searchParams} = req.nextUrl;

    const id = searchParams.get("id");

    const blink = await prisma.blink.findFirst({
        where: {
            id: id as string
        },
        select: {
            blinkName: true,
            blinkDescription: true,
            submitText: true,
            imagePreview: true,
            buttonTypes: true,
            isVerified: true,
            amount: true,
        }
    }) 

    if (!blink || !blink.isVerified) {
        const response: ActionGetResponse = {
          description: "No such bounty found",
          icon: "https://imgs.search.brave.com/4jrmq74DXMRXOQoamba5WnCwQPlmckEnsjQkEnBib7M/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTU1/Mzg0OTMzL3Bob3Rv/L2NvbXB1dGVyLXNo/b3dpbmctYW4tZXJy/b3ItbWVzc2FnZS5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/c05UdTlCQW81OEhP/MkZOSWpzRXNuTWY1/X2R0S2ZPSVVoUGNj/VzR1Nml0Zz0",
          title: "404 Not found :(",
          label: "No Such submission",
          disabled: true,
          error: {
            message: "No such bounty is active! Please check the blink properly",
          },
        };
        return NextResponse.json(response, {
          headers: ACTIONS_CORS_HEADERS,
        });
    }

    let params: ActionParameter[];

    blink.buttonTypes.forEach((buttonType) => {
        params.push({
            name: buttonType.content,
            type: buttonType.type as ActionParameterType,
            required: true,
        })
    })

    const response: ActionGetResponse = {
        icon: blink.imagePreview,
        title: blink.blinkName,
        description: blink.blinkDescription,
        label: blink.submitText,
        links: {
            actions: [
              {
                href: `/api/app/actions?id=${id}&email={email}&data=${str}`,
                label: blink.submitText,
                parameters: params,
              },
            ],
        },
    }    
}
