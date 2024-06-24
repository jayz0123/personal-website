import { createClient } from '@/utils/supabase/server';
import Photo from './Photo';

export default async function PhotoCarousel() {
  const supabase = createClient();
  console.log(supabase);

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
  const { data, error: errorCreating } = await supabase.storage
    .from('Gallery')
    .createSignedUrls(paths, 60);

  if (!data) {
    return <div>Error creating urls</div>;
  }

  const urls = data?.map((file) => file.signedUrl);

  return (
    <div className="carousel carousel-center glass p-4 space-x-8 rounded-box">
      {urls.map((url: string, index: number) => (
        <div className="carousel-item" key={index}>
          <Photo src={url} />
        </div>
      ))}
    </div>
  );
  // } catch (error) {
  //   console.log(error);
  //   return <div>Error fetching photos</div>;
  // }
}
