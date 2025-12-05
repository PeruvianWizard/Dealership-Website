import { supabase } from "@/lib/supabaseClient";

export async function PUT(req: Request) {
    const { vin, ...rest } = await req.json();
    const { error } = await supabase.from("vehicle").update(rest).eq("vin", vin);
    if (error) return new Response(error.message, { status: 400 });
    return new Response("OK");
}

export async function DELETE(req: Request) {
    const { vin } = await req.json();
    const { error } = await supabase.from("vehicle").delete().eq("vin", vin);
    if (error) return new Response(error.message, { status: 400 });
    return new Response("OK");
}
