import Greetings from "@/components/Greetings";
import Timeline from "@/components/Timeline";

export default function Page() {
  return (
    <div>
      <h2 className="text-3xl font-bold my-4">
        <Greetings />
      </h2>
      <p className="text-lg mb-4">
        I&apos;m a passionate Software Development Engineer with a knack for
        machine learning and GPU programming. I love making advanced computing
        systems run faster and better, drawing on my background in electronic
        engineering and applied machine learning. I&apos;m great at working with
        tech-savvy teams to create innovative solutions.
      </p>
      <div>
        <Timeline />
      </div>
      {/* Testing */}
      {/* <div className="space-y-4">
        {[...Array(15)].map((_, i) => (
          <p key={i} className="text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
            odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
            quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
            mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
            Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad
            litora torquent per conubia nostra, per inceptos himenaeos.
            Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.
          </p>
        ))}
      </div> */}
    </div>
  );
}
