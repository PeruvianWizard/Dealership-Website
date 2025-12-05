// app/dealership/[did]/DealershipClient.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import BuyVehicle from "./BuyVehicle";

export default function DealershipClient({ did, dealership, vehicles }) {
    const [loggedIn, setLoggedIn] = useState(false);

    // Edit modal state
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [editMileage, setEditMileage] = useState("");
    const [editPrice, setEditPrice] = useState("");

    // OPEN edit modal
    function openEdit(v: any) {
        setEditId(v.vin);
        setEditMileage(v.mileage ?? "");
        setEditPrice(v.price ?? "");
        setIsEditing(true);
    }

    // SUBMIT edit
    async function submitEdit() {
        if (editId == null) return;

        try {
            const res = await fetch(`/dealership/${did}/route`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    vin: editId,
                    mileage: Number(editMileage),
                    price: Number(editPrice),
                }),
            });

            if (!res.ok) {
                const txt = await res.text();
                return;
            }

            setIsEditing(false);
            // You can refresh using router refresh
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    }

    // DELETE vehicle
    async function deleteVehicle(vin: number) {

        const res = await fetch(`/dealership/${did}/route`, {
            method: "DELETE",
            body: JSON.stringify({ vin }),
        });

        if (!res.ok) {
            return;
        }

        // You can refresh using router refresh
        window.location.reload();
    }

    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold">{dealership.name}</h1>
                    <p className="text-sm text-gray-600">{dealership.address}</p>
                </div>

                {/* Switch for logging into dealership */}
                <label className="flex items-center cursor-pointer">
                    Log into This Dealership
                    <div className="relative">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            onChange={(e) => setLoggedIn(e.target.checked)}
                        />
                        <div className="w-12 h-7 bg-gray-300 rounded-full peer-checked:bg-green-400 transition-colors"></div>
                        <div className="absolute left-0 top-0 h-7 w-7 bg-white rounded-full shadow transform peer-checked:translate-x-5 transition-transform"></div>
                    </div>
                </label>


                <div>
                    <Link href={`/dealership/${did}/transactions`} className="btn btn-ghost btn-sm">
                        View Transactions
                    </Link>
                </div>
                <div>
                    <Link href="/" className="btn btn-ghost btn-sm">← Back to Landing</Link>
                </div>
            </div>

            {vehicles && vehicles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {vehicles.map((v) => (
                        <div key={v.vin} className='flex-row' aria-disabled={v.bought ?? true}>
                            <div className="p-4 flex-column shadow rounded bg-white">
                                <h2 className="font-semibold">{v.make} {v.model} ({v.year})</h2>
                                <p className="text-sm">VIN: {v.vin}</p>
                                <p className="text-sm">Mileage: {v.mileage}</p>
                                <p className="text-sm">Price: ${v.price}</p>

                                {/* Only show edit/delete when logged in */}
                                {loggedIn && (
                                    <div className="flex gap-2 mt-3">
                                        <button
                                            type="button"
                                            onClick={() => openEdit(v)}
                                            className="px-3 py-1">

                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => deleteVehicle(v.vin)}
                                            className="px-3 py-1 text-red-600">

                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                            <BuyVehicle did={did} vin={v.vin} />

                            
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-sm text-gray-600">No vehicles for this dealership.</p>
            )}

            {/* EDIT Modal */}
            {isEditing && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow max-w-md w-full">
                        <h3 className="text-xl font-semibold mb-4">Edit Dealership</h3>

                        <form onSubmit={submitEdit} className="space-y-3">
                            <input
                                className="border p-2 w-full rounded"
                                required
                                value={editMileage}
                                onChange={(e) => setEditMileage(e.target.value)}
                            />
                            <input
                                className="border p-2 w-full rounded"
                                required
                                value={editPrice}
                                onChange={(e) => setEditPrice(e.target.value)}
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
        </>
    );
}
