"use client"

import React from 'react';
import { useSession } from '@/app/components/SessionProvider';
import { supabase } from '@/lib/supabaseClient';

export default function BuyVehicle({did, vin} : {did:number, vin:string}) {
    const { session } = useSession();

    const buy = async () => {

        const { data: customer, error: customerError} = await supabase.from("customer")
            .select("*")
            .eq("userid", session?.user.id)
            .single();

        if (customerError) {
            console.error("Could not get customerid:", customerError);
            return;
        } 

        const { error: transactionError } = await supabase.from("transactions")
            .insert({
                did: did,
                vin: vin,
                customerid: customer?.customerid
            })
            .single();

        if (transactionError) {
            console.error("Could not insert into transcations table:", transactionError);
            return;
        }
        
        const { error: vehicleError} = await supabase.from("vehicle")
            .update({ bought: true})
            .eq('vin', vin);

        if (vehicleError) {
            console.error("Could not update 'bought' vehicle status: ", vehicleError);
        }

        console.log("New transaction inserted successfully!");
    }

    return(
        <>
            { session ? (
                <div>
                    <button className='bg-blue h-10 rounded text-white px-8'
                        onClick={() => buy()}
                    >
                        Buy
                    </button>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}