export class BooksManager {
  "this class is responsible for request to backend to make the command ";

  // this function for add new book
  async addBook(image) {
    const request = await fetch(
      "http://localhost:8000/protected/books/upload-book",
      {
        method: "POST",
        credentials: "include",
        body: image,
      }
    );
    const response = await request.json();
    if (response.invalid_token) {
      window.location.href = response.invalid_token
    }
    if (response?.error) {
      return response;
    }
    return response;
  }

    async addBookManually(formData) {
    const request = await fetch(
      "http://localhost:8000/protected/books/add-book",
      {
        method: "POST",
        credentials: "include",
        body:formData
      }
    );
    const response = await request.json();
    if (response.invalid_token) {
      window.location.href = response.invalid_token
    }
    if (response?.error) {
      return response;
    }
    return response;
  }
  async getBooks(user_id) {
    const request = await fetch(
      `http://localhost:8000/protected/books/get-books?user_id=${user_id}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const response = await request.json();
    if (response.invalid_token) {
      window.location.href = response.invalid_token
    }
    if (response?.error) {
      return response;
    }
    return response;
  }

  async getBook(book_id) {
    const request = await fetch(
      `http://localhost:8000/protected/books/get-book?book_id=${book_id}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const response = await request.json();
    if (response.invalid_token) {
      window.location.href = response.invalid_token
    }
    if (response?.error) {
      return response;
    }
    return response;
  }

  async editBook(name, writer, publisher, category,total_pages, user_id, id) {
    const request = await fetch(
      `http://localhost:8000/protected/books/edit-book?user_id=${user_id}&id=${id}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          book_name: name,
          writer: writer,
          publisher: publisher,
          category: category,
          total_pages: total_pages
        }),
      }
    );
    const response = await request.json();
    if (response?.invalid_token) {
      window.location.href = response.invalid_token
    }
    if (response?.error) {
      return response;
    }
    return response;
  }

  async deleteBooks(user_id, id) {
    const request = await fetch(
      `http://localhost:8000/protected/books/delete-book?user_id=${user_id}&id=${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    const response = await request.json();
    if (response?.invalid_token) {
      window.location.href = response.invalid_token
    }
    if (response?.error) {
      return response;
    }
    return response;
  }

  async setInFavourite(user_id, id) {
    const request = await fetch(
      `http://localhost:8000/protected/books/favourite/set-in-favourate-books?user_id=${user_id}&id=${id}`,
      {
        method: "PATCH",
        credentials: "include",
      }
    );
    const response = await request.json();
    if (response?.invalid_token) {
      window.location.href = response.invalid_token
    }
    if (response?.error) {
      return response;
    }
    return response;
  }

  async setInDaily(user_id, id) {
    const request = await fetch(
      `http://localhost:8000/protected/books/daily/set-in-daily-books?user_id=${user_id}&id=${id}`,
      {
        method: "PATCH",
        credentials: "include",
      }
    );
    const response = await request.json();
    if (response?.invalid_token) {
      window.location.href = response.invalid_token
    }
    if (response?.error) {
      return response;
    }
    return response;
  }

  async setInRead(user_id, id) {
    const request = await fetch(
      `http://localhost:8000/protected/books/set-book-read?user_id=${user_id}&id=${id}`,
      {
        method: "PATCH",
        credentials: "include",
      }
    );
    const response = await request.json();
    if (response?.invalid_token) {
      window.location.href = response.invalid_token
    }
    if (response?.error) {
      return response;
    }
    return response;
  }

  async deleteFromFavourite(user_id, id) {
    const request = await fetch(
      `http://localhost:8000/protected/books/favourite/delete-from-favourite?user_id=${user_id}&id=${id}`,
      {
        method: "PATCH",
        credentials: "include",
      }
    );
    const response = await request.json();
    if (response?.invalid_token) {
      window.location.href = response.invalid_token
    }
    if (response?.error) {
      return response;
    }
    return response;
  }

  async deleteFromDaily(user_id, id) {
    const request = await fetch(
      `http://localhost:8000/protected/books/daily/delete-from-daily?user_id=${user_id}&id=${id}`,
      {
        method: "PATCH",
        credentials: "include",
      }
    );
    const response = await request.json();
    if (response?.invalid_token) {
      window.location.href = response.invalid_token
    }
    if (response?.error) {
      return response;
    }
    return response;
  }
  async getFavoriteBooks(user_id) {
    const request = await fetch(
      `http://localhost:8000/protected/books/favourite/get-favourite-books?user_id=${user_id}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const response = await request.json();
    if (response.invalid_token) {
      window.location.href = response.invalid_token
    }
    if (response?.error) {
      return response;
    }
    return response;
  }

  async getDailyBooks(user_id) {
    const request = await fetch(
      `http://localhost:8000/protected/books/daily/get-daily-books?user_id=${user_id}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const response = await request.json();
    if (response.invalid_token) {
      window.location.href = response.invalid_token
    }
    if (response?.error) {
      return response;
    }
    return response;
  }
}
