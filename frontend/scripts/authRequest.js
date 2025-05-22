class AuthRequest {
  constructor(ip = '127.0.0.1', port = 3000) {
    this.ip = ip;
    this.port = port;
    this.baseUrl = `http://${this.ip}:${port}/auth`;
  }
  loginUser = async ({ username, password }) => {
    const response = await fetch(this.baseUrl + '/login', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const data = await response.json();
    if (!response.ok || response.status === 401) {
      throw data;
    }
    return data;
  };

  validateSession = async () => {
    const response = await fetch(this.baseUrl + '/validateSession', {
      credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok || response.status === 401) {
      throw data;
    }
    return data;
  };

  logout = async () => {
    const response = await fetch(this.baseUrl + '/logout', {
      method: 'POST',
      credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) {
      throw data;
    }
    return data;
  };

  signup = async ({ username, password }) => {
    const response = await fetch(this.baseUrl + '/signup', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        username,
        password,
      }),
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
const authRequest = new AuthRequest();
export default authRequest;
