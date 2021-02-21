import got from "got";

class googleBooksClient {
  static get baseUrl() {
    return "https://www.googleapis.com";
  }

  static async searchBooks(query) {
    const booksResponse = await got.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.REACT_APP_GOOGLE_API_KEY}&maxResults=40`
    );

    const parsedBooksResponse = await JSON.parse(booksResponse.body);
    return parsedBooksResponse;
  }

  serializedBooksResponse(parsedBooksResponse) {
    console.log(parsedBooksResponse);
    const serializedBooks = parsedBooksResponse.books.items.map((book) => {
      const title = book[0].volumeInfo.title;
      const author = book[0].volumeInfo.authors[0];
      const bookArt = book[0].volumeInfo.imageLinks.thumbnail;
      const apiUrl = book.href;
      return {
        title,
        author,
        bookArt,
        apiUrl,
      };
    });
    return serializedBooks;
  }
}
export default googleBooksClient;
