export default function Country({ params }: { params: { name: string } }) {
  return (
    <div className="min-w-full gap-2 grid grid-cols-12">
      Country {params.name}
    </div>
  );
}
