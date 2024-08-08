import { ContactForm } from '@/components/contact';

export default function Contact() {
  return (
    <section
      aria-label="contact"
      className="lg:max-w-[calc(130ch+4rem)] m-auto"
    >
      <div className="flex flex-col justify-center items-center xl:flex-row xl:gap-16 my-auto">
        <div className="max-w-prose flex-1">
          <h1 className="text-2xl mb-8 font-bold">
            Got something to say or just want to share a funny cat meme? Drop me
            a message!
          </h1>
        </div>

        <div className="w-full flex-1 max-w-prose">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
