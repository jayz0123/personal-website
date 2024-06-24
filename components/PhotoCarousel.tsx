import { createClient } from '@/utils/supabase/server';
import Photo from './Photo';
import { url } from 'inspector';

export default async function PhotoCarousel() {
  const supabase = createClient();

  // list all files in the requested folder
  const { data: files, error: errorListing } = await supabase.storage
    .from('Gallery')
    .list('Japan', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' },
    });

  if (!files) {
    return <div>Error listing</div>;
  }

  // generate paths for all files
  const paths = files.map((file) => 'Japan' + '/' + file.name);

  // create signed urls for all files
  const images = paths.map((path) => {
    return supabase.storage.from('Gallery').getPublicUrl(path);
  });

  if (!images) {
    return <div>Error creating urls</div>;
  }

  const urls = images.map((image) => image.data.publicUrl);

  return (
    <div className="carousel carousel-center glass p-4 space-x-8 rounded-box">
      {urls.map((url: string, index: number) => (
        <div className="carousel-item" key={index}>
          <Photo src={url} />
        </div>
      ))}
    </div>
  );
}
