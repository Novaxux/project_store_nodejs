class ApiCalls {
  constructor(ip = '127.0.0.1', port = 3000) {
    this.baseUrl = `http://${ip}:${port}`;
  }

  getAllProducts = async () => {
    const response = await fetch(`${this.baseUrl}/products`);
    const data = await response.json();
    if (!response.ok) {
      throw data;
    }
    return data;
  };

  deleteProduct = async (id) => {
    const response = await fetch(`${this.baseUrl}/products/${id}`, {
      method: 'DELETE',
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
    const response = await fetch(`${this.baseUrl}/products/${id}`);
    const data = await response.json();
    if (!response.ok) {
      throw data;
    }
    return data;
  };

  postProduct = async (params) => {
    const response = await fetch(`${this.baseUrl}/products`, {
      method: 'POST',
      body: JSON.stringify(params),
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
}

export const api = new ApiCalls();
export { ApiCalls };
