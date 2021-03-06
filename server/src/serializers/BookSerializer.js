class BookSerializer {
  static async getSummary(book) {
    const allowedAttributes = ["id", "title", "author", "userId", "imageUrl"];

    let serializedBook = {};

    for (const attribute of allowedAttributes) {
      serializedBook[attribute] = book[attribute];
    }
    return serializedBook;
  }
}
export default BookSerializer;
