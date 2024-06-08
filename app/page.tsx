// page.tsx
export default function Page() {
  return (
    <div className="container mx-8">
      <h2 className="text-3xl font-bold my-4">
        Welcome to Howie {`Jayz's`} Personal Website
      </h2>
      <p className="text-lg">
        This is the homepage of Howie Jayz. Here you can find information about me, my blog, and how to contact me.
      </p>
      {/* Testing */}
      <div className="space-y-4">
        {[...Array(15)].map((_, i) => (
          <p key={i} className="text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.
          </p>
        ))}
      </div>
    </div>
  );
}
