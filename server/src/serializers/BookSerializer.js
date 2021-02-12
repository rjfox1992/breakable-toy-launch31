class BookSerializer {
  static async getSummary(book) {
    const allowedAttributes = ["id", "title", "author", "userId", "bookListId"];

    let serializedBook = {};

    for (const attribute of allowedAttributes) {
      serializedBook[attribute] = book[attribute];
    }
    return serializedBook;
  }
}
export default BookSerializer;
