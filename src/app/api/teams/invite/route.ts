import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import sgMail from "@sendgrid/mail";
import { v4 as uuidv4 } from "uuid";

// Configure SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(request: Request) {
  const { email, role } = await request.json();

  if (!email || !role) {
    return NextResponse.json({ success: false, error: { message: "Missing email or role." } }, { status: 400 });
  }

  const token = uuidv4();

  try {
    // Use the client SDK to add a new document to the 'invitations' collection
    await addDoc(collection(db, "invitations"), {
      email,
      role,
      token,
      createdAt: new Date(),
    });

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="text-align: center; color: #0D2E61;">You're Invited!</h2>
          <p>Hello,</p>
          <p>You have been invited to join the Simsem Admin Team. Click the button below to accept your invitation and set up your account.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="http://localhost:3000/accept-invite?token=${token}" style="background-color: #FB8B24; color: #fff; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Accept Invitation</a>
          </div>
          <p>If you did not expect this invitation, you can safely ignore this email.</p>
          <p>Thanks,<br>The Simsem Team</p>
          <div style="text-align: center; font-size: 12px; color: #aaa; margin-top: 20px; border-top: 1px solid #ddd; padding-top: 10px;">
            <p>Simsem Inc. | 123 Travel Lane, Adventure City, World</p>
          </div>
        </div>
      </div>
    `;

    const msg = {
      to: email,
      from: "hello@mysimsem.com", // Use a verified sender email in your SendGrid account
      subject: "You have been invited to join the Simsem Admin Team",
      html: emailHtml,
    };

    await sgMail.send(msg);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error in invite API route:", JSON.stringify(error));
    return NextResponse.json({ success: false, error: { message: "Failed to send invitation." } }, { status: 500 });
  }
}
