"use client";

import { useState, useEffect } from "react";

export default function AdminPage() {
    // Create form fields
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [status, setStatus] = useState("");

    // List of dealerships
    const [dealerships, setDealerships] = useState<any[]>([]);

    // Edit modal state
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);
    const [editName, setEditName] = useState("");
    const [editAddress, setEditAddress] = useState("");
    const [editPhone, setEditPhone] = useState("");

    // Load dealerships
    async function fetchDealerships() {
        try {
            const res = await fetch("/admin/route", { method: "GET" });
            if (!res.ok) {
                console.error("Failed to fetch dealerships:", res.status);
                setDealerships([]);
                return;
            }
            const data = await res.json();
            setDealerships(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Fetch error:", err);
            setDealerships([]);
        }
    }

    useEffect(() => {
        fetchDealerships();
    }, []);

    // CREATE dealership
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus("Submitting...");

        try {
            const res = await fetch("/admin/route", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    address,
                    phone: Number(phone),
                }),
            });

            if (!res.ok) {
                const txt = await res.text();
                setStatus(`Failed to create dealership: ${txt || res.status}`);
                return;
            }

            setStatus("Dealership created!");
            setName("");
            setAddress("");
            setPhone("");
            await fetchDealerships();
        } catch (err) {
            console.error(err);
            setStatus("Failed to create dealership (network).");
        }
    }

    // OPEN edit modal
    function openEdit(d: any) {
        setEditId(d.did);
        setEditName(d.name ?? "");
        setEditAddress(d.address ?? "");
        setEditPhone(String(d.phone ?? ""));
        setIsEditing(true);
    }

    // SUBMIT edit
    async function submitEdit() {
        if (editId == null) return;

        try {
            const res = await fetch("/admin/route", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    did: editId,
                    name: editName,
                    address: editAddress,
                    phone: Number(editPhone),
                }),
            });

            if (!res.ok) {
                const txt = await res.text();
                setStatus(`Error updating dealership: ${txt || res.status}`);
                return;
            }

            setIsEditing(false);
            await fetchDealerships();
        } catch (err) {
            console.error(err);
        }
    }

    // DELETE dealership
    async function deleteDealer(did: number) {
        const ok = confirm("Delete this dealership? This cannot be undone.");
        if (!ok) return;

        try {
            const res = await fetch("/admin/route", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ did }),
            });

            if (!res.ok) {
                const txt = await res.text();
                alert(`Failed to delete: ${txt || res.status}`);
                return;
            }

            // refresh list
            await fetchDealerships();
        } catch (err) {
            console.error(err);
            alert("Network error while deleting.");
        }
    }

    return (
        <main className="p-8 bg-slate-100">
            {/* CREATE form */}
            <div className="p-8 max-w-xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Create New Dealership</h1>

                <form onSubmit={handleSubmit} className="space-y-4 p-4 shadow rounded bg-white">
                    {/* Name */}
                    <div>
                        <label className="block mb-1 font-medium">Name: </label>
                        <input
                            className="border border-gray-300 rounded p-2 w-full"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block mb-1 font-medium">Address: </label>
                        <input
                            className="border border-gray-300 rounded p-2 w-full"
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block mb-1 font-medium">Phone Number: </label>
                        <input
                            className="border border-gray-300 rounded p-2 w-full"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="px-2 py-1 border rounded">
                        Create Dealership
                    </button>

                    {status && <p className="text-sm mt-2 text-gray-700">{status}</p>}
                </form>
            </div>

            {/* LIST Dealerships */}
            <h2 className="text-xl font-semibold mt-10 mb-4">Existing Dealerships</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dealerships.map((d: any) => (
                    <div key={d.did} className="p-4 shadow rounded bg-white">
                        <div>
                            <p className="text-xl font-semibold">{d.name}</p>
                            <p className="text-sm text-gray-600">{d.address}</p>
                            <p className="text-sm text-gray-600">Phone: {d.phone}</p>
                        </div>

                        <div className="flex gap-2 mt-3">
                            <button
                                type="button"
                                onClick={() => openEdit(d)}
                                className="px-3 py-1"
                            >
                                Edit
                            </button>

                            <button
                                type="button"
                                onClick={() => deleteDealer(d.did)}
                                className="px-3 py-1 text-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* EDIT Modal */}
            {isEditing && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow max-w-md w-full">
                        <h3 className="text-xl font-semibold mb-4">Edit Dealership</h3>

                        <form onSubmit={submitEdit} className="space-y-3">
                            <input
                                className="border p-2 w-full rounded"
                                required
                                value={editName.trim()}
                                onChange={(e) => setEditName(e.target.value)}
                            />
                            <input
                                className="border p-2 w-full rounded"
                                required
                                value={editAddress.trim()}
                                onChange={(e) => setEditAddress(e.target.value)}
                            />
                            <input
                                className="border p-2 w-full rounded"
                                required
                                value={editPhone.trim()}
                                onChange={(e) => setEditPhone(e.target.value)}
                            />

                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-3 py-1 text-red-600 border rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-3 py-1 border rounded"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
}
