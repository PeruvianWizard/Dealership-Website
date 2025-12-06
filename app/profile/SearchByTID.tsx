import { supabase } from '@/lib/supabaseClient';
import React, { useState } from 'react';

export default function SearchByTID() {
    const [tid, setTid] = useState(0);
    const [showVInfo, setShowVInfo] = useState(false);
    const [vehicleData, setVehicleData] = useState<any[]>([]);

    const lookUp = async () => {
        // Inner join of vehicle table with transactions table on did
        if (!tid) {
            return;
        }

        const { data, error } = await supabase
            .from("vehicle")
            .select("*, transactions!inner(did)")
            .eq("transactions.tid", tid)

        if (error) {
            console.error("Could not retrieve vehicle data:", error)
        }
        if (data && data.length > 0) {
            console.log("Vehicle data retrieved successfully:", data);
            setVehicleData(data);
            setShowVInfo(true);
        }
    }
    

    return(
        <div className='flex flex-column justify-center pt-3'>
            <h1>Look Up Bought Vehicle </h1>
            <div>
                { !showVInfo? (
                    <>
                        <input
                            className='w-full my-2 rounded py-input px-input '
                            value={tid}
                            onChange={(e) => setTid(+e.target.value)}
                            id="tid"
                            type="id"
                            placeholder='Insert Transaction ID'

                        />
                        <button className='w-half bg-blue h-10 rounded text-white'
                            onClick={() => {
                                lookUp();
                            }}
                        > 
                            Look Up
                        </button>
                    </>
                ) : (
                    <div className='flex flex-column items-center space-y-3'>
                        <div className="p-4 flex-column shadow rounded bg-white">
                                <h2 className="font-semibold">{vehicleData[0].make} {vehicleData[0].model} ({vehicleData[0].year})</h2>
                                <p className="text-sm">VIN: {vehicleData[0].vin}</p>
                                <p className="text-sm">Mileage: {vehicleData[0].mileage}</p>
                                <p className="text-sm">Price: ${vehicleData[0].price}</p>
                        </div>
                        <button className='w-half bg-blue h-10 rounded text-white' onClick={() => {setShowVInfo(false)}}>Go Back</button>
                    </div>
                )}
            </div>
        </div>
    );
}