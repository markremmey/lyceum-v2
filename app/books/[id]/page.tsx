// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
// import books from '../../../data/book_list.json';
import { books } from '../../../src/data/books';

function Page({ params }: { params: { id: string } }) {
  const book = books.find(book => String(book.id) === params.id);
  if (!book) {
    return <div>Book not found</div>;
  }
  return <div>Book: {params.id} {book.title}</div>
}


export default Page;

