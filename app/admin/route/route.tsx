//app/admin/route.tsx
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// Post Request to handle dealership creation
export async function POST(req: Request) {

    // Request parameters
    const { name, address, phone } = await req.json();

    // Insertion into Supabase database
    const { error } = await supabase
        .from("dealership")
        .insert({
            name,
            address,
            phone,
        });

    // Error Handling
    if (error) {
        console.error("Insertion Error:", error);
        return NextResponse.json({ error: error.message, code: error.code, details: error.details }, { status: 400 });
    }

    // Return success on good insertion
    return NextResponse.json({ success: true });
}
