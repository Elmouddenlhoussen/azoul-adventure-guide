
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@11.18.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.8";

const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY") || "";
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2023-08-16",
});

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting payment verification');
    const { payment_intent_id } = await req.json();
    
    // Retrieve the payment intent to verify its status
    console.log('Retrieving payment intent:', payment_intent_id);
    const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent_id);
    console.log('Payment intent status:', paymentIntent.status);
    
    // If the payment was successful, update the booking status
    if (paymentIntent.status === "succeeded") {
      const bookingId = paymentIntent.metadata.booking_id;
      console.log('Payment successful, updating booking:', bookingId);
      
      // Update the booking in the database
      const { error } = await supabase
        .from("bookings")
        .update({ 
          status: "confirmed",
          payment_intent_id: payment_intent_id,
          updated_at: new Date().toISOString()
        })
        .eq("id", bookingId);
      
      if (error) {
        console.error('Error updating booking:', error);
        throw new Error(`Failed to update booking: ${error.message}`);
      }
      
      console.log('Booking updated successfully');
      return new Response(
        JSON.stringify({ success: true, status: "confirmed" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    } else {
      console.log('Payment not complete, status:', paymentIntent.status);
      // Payment is not complete
      return new Response(
        JSON.stringify({ success: false, status: paymentIntent.status }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
