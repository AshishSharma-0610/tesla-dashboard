export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { apiSecret } = await req.json();

    try {
        const response = await fetch("https://testd5-img.azurewebsites.net/api/imgdownload", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ api: apiSecret }),
        });

        if (!response.ok) {
            return NextResponse.json({ message: "Error fetching image" }, { status: 500 });
        }

        const imageBase64 = await response.text();
        return NextResponse.json({ image: imageBase64 });
    } catch (error: unknown) {
        const e = error as Error;
        return NextResponse.json({ message: "Server error", error: e.message }, { status: 500 });
    }
}
