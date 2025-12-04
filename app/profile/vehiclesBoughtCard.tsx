import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useSession } from '@components/SessionProvider';

export default function VehiclesBoughtCard() {
    const [vehiclesNum, setVehiclesNum] = useState(0);
    const { session } = useSession();

    const userid = session?.user.id;

    useEffect(() => {
        const vehiclesBought = async () => {
            const { count,  error } = await supabase
                .from("transactions")
                .select("tid, customer!inner(customerid)", {count: "exact"})
                .eq("customer.userid", userid)

            if (!error) {
                setVehiclesNum(count ?? 0);
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
        <div className='bg-green rounded-xl shadow-lg p-6 w-64 flex flex-column items-center justify-center'>
            <h2>Total Cars Bought</h2>
            <p>{vehiclesNum}</p>
        </div>
    );
}