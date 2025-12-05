import { supabase } from "@/lib/supabaseClient";

export async function GET() {
    const { data } = await supabase.from("dealership").select("*").order("did");
    return Response.json(data);
}

export async function POST(req: Request) {
    const body = await req.json();
    const { error } = await supabase.from("dealership").insert(body);
    if (error) return new Response(error.message, { status: 400 });
    return new Response("OK");
}

export async function PUT(req: Request) {
    const { did, ...rest } = await req.json();
    const { error } = await supabase.from("dealership").update(rest).eq("did", did);
    if (error) return new Response(error.message, { status: 400 });
    return new Response("OK");
}

export async function DELETE(req: Request) {
    const { did } = await req.json();
    const { error } = await supabase.from("dealership").delete().eq("did", did);
    if (error) return new Response(error.message, { status: 400 });
    return new Response("OK");
}
