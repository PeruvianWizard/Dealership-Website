import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useSession } from '@components/SessionProvider';

export default function VehiclesBoughtCard() {
    const [vehiclesNum, setVehiclesNum] = useState(0);
    const [txns, setTxns] = useState<any[]>([]);
    const [showTxns, setShowTxns] = useState(false);
    const { session } = useSession();

    const userid = session?.user.id;

    useEffect(() => {
        const vehiclesBought = async () => {
            const { data, count,  error } = await supabase
                .from("transactions")
                .select("*, customer!inner(customerid)", {count: "exact"})
                .eq("customer.userid", userid)

            if (!error) {
                setVehiclesNum(count ?? 0);
                setTxns(data);
            }
            else {
                console.log("Could not retrieve vehicles from database: ", error);
            }
        }

        vehiclesBought();
    }, [userid])

    if (!userid) {
        return <div className="p-8">No User logged in.</div>;
    }

    return (
        <div className='bg-green rounded-xl shadow-lg p-6 w-64 flex flex-column items-center justify-center '
            onClick={() => setShowTxns(true)}>
            { !showTxns ? (
                <div className='flex flex-column items-center justify-center cursor-pointer'>
                    <h2>Total Cars Bought</h2>
                    <p>{vehiclesNum}</p>
                    <p className='pt-6'>Click to see all transactions</p>
                </div>
            ) : (
                <div>
                    <h2>All Transactions</h2>
                    {txns.length === 0 ? (
                        <p>No transactions found.</p>
                    ) : (
                        txns.map((t) => (
                            <div key={t.tid} className='border-1px-black py-2 px-2 rounded-xl bg-white'>
                                <p>Transaction ID: {t.tid}</p>
                                <p>VIN: {t.vin}</p>
                            </div>
                        ))
                    )}
                    <p className='text-blue-500 hover:underline pt-6 cursor-pointer' 
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowTxns(false);
                        }}>Close</p>
                </div>
            )}
            
        </div>
    );
}