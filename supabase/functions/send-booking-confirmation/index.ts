
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.8";
import { format } from "https://esm.sh/date-fns@3.6.0";

// Initialize Supabase client
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// This is a mock email sending function
// In production, you'd integrate with an email service provider like SendGrid, Mailchimp, etc.
async function sendEmail(to: string, subject: string, html: string) {
  console.log(`Sending email to: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`HTML Content: ${html}`);
  
  // In production, you would use a real email service here
  // For now, we'll just return a successful response
  return { success: true };
}

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { booking_id } = await req.json();
    
    // Fetch the booking information
    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .select(`
        *,
        experiences(*)
      `)
      .eq("id", booking_id)
      .single();
    
    if (bookingError || !booking) {
      throw new Error(`No booking found with ID: ${booking_id}`);
    }

    // Get user information
    const { data: userData, error: userError } = await supabase.auth.admin.getUserById(booking.user_id);
    if (userError || !userData.user) {
      throw new Error(`Could not retrieve user information`);
    }
    
    const user = userData.user;
    const experience = booking.experiences;

    // Create email content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #b45309;">Booking Confirmation</h1>
        <p>Dear ${user.email},</p>
        <p>Thank you for booking with Azoul! Your booking has been confirmed.</p>
        
        <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <h2 style="color: #b45309; margin-top: 0;">${experience.title}</h2>
          <p><strong>Booking Reference:</strong> ${booking_id}</p>
          <p><strong>Dates:</strong> ${format(new Date(booking.start_date), 'MMMM d, yyyy')} to ${format(new Date(booking.end_date), 'MMMM d, yyyy')}</p>
          <p><strong>Guests:</strong> ${booking.adults} Adult${booking.adults !== 1 ? 's' : ''}${booking.children > 0 ? `, ${booking.children} Child${booking.children !== 1 ? 'ren' : ''}` : ''}</p>
          <p><strong>Total Price:</strong> $${parseFloat(booking.total_price).toFixed(2)}</p>
        </div>
        
        <p>We're excited to welcome you to Morocco! If you have any questions or special requests, please don't hesitate to contact us.</p>
        
        <p>Best regards,<br>The Azoul Team</p>
      </div>
    `;
    
    // Send the confirmation email
    await sendEmail(
      user.email,
      "Your Azoul Booking Confirmation",
      emailHtml
    );
    
    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
    
  } catch (error) {
    console.error("Error sending booking confirmation:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
