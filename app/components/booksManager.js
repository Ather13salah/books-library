export class BooksManager {
  // دالة عامة للتعامل مع الـ fetch في كل الفانكشنز
  async handleRequest(url, options = {}) {
    try {
      const request = await fetch(`https://library-m2k0.onrender.com${url}`, {
        credentials: "include",
        ...options,
      });

      const response = await request.json();

      if (response?.invalid_token) {
        window.location.href = response.invalid_token;
        return;
      }

      if (response.new_access_token) {
        document.cookie = `token=${response.new_access_token}; path=/; secure; samesite=None; max-age=3600`;
      }

      if (response?.error) {
        return response;
      }

      return response;
    } catch (error) {
      return {
        error: `حدث خطأ أثناء الاتصال بالسيرفر، حاول مرة أخرى لاحقًا`,
      };
    }
  }

  async addBook(image,user_id) {
    return this.handleRequest(`/protected/books/upload-book?user_id=${user_id}`, {
      method: "POST",
      body: image,
    });
  }

  async addBookManually(formData,user_id) {
    return this.handleRequest(`/protected/books/add-book?user_id=${user_id}`, {
      method: "POST",
      body: formData,
    });
  }

  async getBooks(user_id) {
    return this.handleRequest(`/protected/books/get-books?user_id=${user_id}`, {
      method: "GET",
    });
  }

  async getBook(book_id) {
    return this.handleRequest(`/protected/books/get-book?book_id=${book_id}`, {
      method: "GET",
    });
  }

  async editBook(name, writer, publisher, category, total_pages, user_id, id) {
    return this.handleRequest(
      `/protected/books/edit-book?user_id=${user_id}&id=${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          book_name: name,
          writer: writer,
          publisher: publisher,
          category: category,
          total_pages: total_pages,
        }),
      }
    );
  }

  async deleteBooks(user_id, id) {
    return this.handleRequest(
      `/protected/books/delete-book?user_id=${user_id}&id=${id}`,
      { method: "DELETE" }
    );
  }

  async setInFavourite(user_id, id) {
    return this.handleRequest(
      `/protected/books/favourite/set-in-favourate-books?user_id=${user_id}&id=${id}`,
      { method: "PATCH" }
    );
  }

  async setInDaily(user_id, id) {
    return this.handleRequest(
      `/protected/books/daily/set-in-daily-books?user_id=${user_id}&id=${id}`,
      { method: "PATCH" }
    );
  }

  async setInRead(user_id, id) {
    return this.handleRequest(
      `/protected/books/set-book-read?user_id=${user_id}&id=${id}`,
      { method: "PATCH" }
    );
  }

  async deleteFromFavourite(user_id, id) {
    return this.handleRequest(
      `/protected/books/favourite/delete-from-favourite?user_id=${user_id}&id=${id}`,
      { method: "PATCH" }
    );
  }

  async deleteFromDaily(user_id, id) {
    return this.handleRequest(
      `/protected/books/daily/delete-from-daily?user_id=${user_id}&id=${id}`,
      { method: "PATCH" }
    );
  }

  async getFavoriteBooks(user_id) {
    return this.handleRequest(
      `/protected/books/favourite/get-favourite-books?user_id=${user_id}`,
      { method: "GET" }
    );
  }

  async getDailyBooks(user_id) {
    return this.handleRequest(
      `/protected/books/daily/get-daily-books?user_id=${user_id}`,
      { method: "GET" }
    );
  }
  async logOut() {
    const res = await this.handleRequest(`/auth/logout`, { method: "POST" });
   
    return res;
  }
}
export function getUserID() {
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith("user_id")) {
      return cookie.split("=")[1];
    }
  }
  return null;
}
