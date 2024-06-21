import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import EmailToUser from './EmailToUser';
import EmailToMe from './EmailToMe';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, msg, filename, content } = await request.json();

    const userSubject = name
      ? `Thanks for your message, ${name}!`
      : `Thanks for your message!`;

    const emailPromises = [
      // send the user's msg to me
      resend.emails.send({
        from: 'Howie Jayz <contact@howiejayz.com>',
        to: ['howiejayzh@gmail.com'],
        reply_to: email,
        subject: `New message from ${name ? name : 'Anonymous'}`,
        react: <EmailToMe userEmail={email} userMessage={msg} />,
        attachments: filename ? [{ filename, content }] : undefined,
      }),
      // send feedback to the user
      resend.emails.send({
        from: 'Howie Jayz <contact@howiejayz.com>',
        to: [email],
        reply_to: 'howiejayzh@gmail.com',
        subject: userSubject,
        react: <EmailToUser userName={name} userMessage={msg} />,
      }),
    ];

    const results = await Promise.all(emailPromises);

    if (results.some((result) => result.error)) {
      return NextResponse.error();
    }
    return NextResponse.json(
      results.map((result) => result.data),
      { status: 200 },
    );
  } catch {
    return NextResponse.error();
  }
}
