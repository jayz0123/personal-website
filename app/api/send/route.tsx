import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import EmailTemplate from "@/components/EmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, msg, filename, content } = await request.json();
    // console.log(content);

    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["howiejayzh@gmail.com"],
      reply_to: email,
      subject: `New message from ${name}`,
      react: <EmailTemplate userEmail={email} userMessage={msg} />,
      attachments: filename ? [{ filename, content }] : undefined,
    });

    if (error) {
      return NextResponse.error();
    }

    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.error();
  }
}
