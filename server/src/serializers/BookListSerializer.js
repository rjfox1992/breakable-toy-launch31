class BookListSerializer {
  static async getSummary(bookList) {
    const allowedAttributes = ["id", "name", "userId", "imageUrl"];

    let serializedBookList = {};

    for (const attribute of allowedAttributes) {
      serializedBookList[attribute] = bookList[attribute];
    }
    return serializedBookList;
  }
}
export default BookListSerializer;
