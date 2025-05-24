class ApiCalls {
  constructor(ip = '127.0.0.1', port = 3000) {
    this.baseUrl = `http://${ip}:${port}`;
  }

  getAllProducts = async () => {
    const response = await fetch(`${this.baseUrl}/products`, {
      credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) {
      throw data;
    }
    return data;
  };

  deleteProduct = async (id) => {
    const response = await fetch(`${this.baseUrl}/products/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) {
      throw data;
    }
    return {
      header: 'Success',
      body: `Product with id: ${id} successfully deleted`,
    };
  };

  editProduct = async (params) => {
    const response = await fetch(`${this.baseUrl}/products/${params.id}`, {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify(params),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw data;
    }
    return { header: 'Success', body: `Product with id:${params.id} edited` };
  };

  getProduct = async (id) => {
    const response = await fetch(`${this.baseUrl}/products/${id}`, {
      credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) {
      throw data;
    }
    return data;
  };
  searchProduct = async (name) => {
    const response = await fetch(
      `${this.baseUrl}/products/search?name=${name}`,
      {
        credentials: 'include',
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw data;
    }
    return data;
  };
  postOrder = async (order) => {
    const response = await fetch(`${this.baseUrl}/order`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(order),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw data;
    }
    return data;
  };
  getOrderDetails = async (id) => {
    const response = await fetch(`${this.baseUrl}/order/${id}`, {
      credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) {
      throw data;
    }
    return data;
  };
  getOrders = async (id) => {
    const response = await fetch(`${this.baseUrl}/order`, {
      credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) {
      throw data;
    }
    return data;
  };
}

const api = new ApiCalls();
export default api;
