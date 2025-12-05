//app/admin/page.tsx
"use client";

import { useState } from "react";

export default function InsertDealership() {

    // Variables and their use states
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [status, setStatus] = useState("");

    // Submission function
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus("Submitting...");

        const res = await fetch("/admin/route", {
            method: "POST",
            body: JSON.stringify({
                name,
                address,
                phone: Number(phone),
            }),
        });

        if (!res.ok) {
            setStatus("Failed to create dealership.");
            return;
        }

        setStatus("Dealership created!");
        setName("");
        setAddress("");
        setPhone("");
    }

    return (
        <main className="p-8 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Create New Dealership</h1>

            <form onSubmit={handleSubmit} className="space-y-4 p-4 shadow rounded bg-white">

                <div>
                    <label className="block mb-1 font-medium">Name: </label>
                    <input
                        className="input input-bordered w-full"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Address: </label>
                    <input
                        className="input input-bordered w-full"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        type="text"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Phone Number: </label>
                    <input
                        className="input input-bordered w-full"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        type="text"
                    />
                </div>

                <button type="submit" className="btn btn-primary">Create Dealership</button>

                {status && <p className="text-sm text-gray-700">{status}</p>}
            </form>
        </main>
    );
}
