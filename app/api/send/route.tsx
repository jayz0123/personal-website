import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import EmailTemplate from "@/components/EmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { userName, userEmail, userMessage, base64Content, filename } =
      await req.json();
    console.log(base64Content);

    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["howiejayzh@gmail.com"],
      reply_to: userEmail,
      subject: `New message from ${userName}`,
      react: <EmailTemplate userEmail={userEmail} userMessage={userMessage} />,
      attachments: [{ content: base64Content, filename }],
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
