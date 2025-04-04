interface loginSchema {
  email: string;
  password: string;
}

interface registerSchema {
  name: string;
  email: string;
  username: string;
  password: string;
}

interface createWorkspaceSchema {
  name: string;
  shortname: string;
}

interface updateWorkspaceSchema extends createWorkspaceSchema {
  id: number;
}

interface CreateBoardSchema {
  workspaceId: number;
  name: string;
}

class Api {
  private readonly BASE_URL = 'http://localhost:3000/api';
  async getCurrentUser(token: string) {
    const response = await fetch(`${this.BASE_URL}/user/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Not authorized');
    }
    return await response.json();
  }

  async login(data: loginSchema) {
    const response = await fetch(`${this.BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to login');
    }
    const { token } = await response.json();
    return token;
  }

  async register(data: registerSchema) {
    const response = await fetch(`${this.BASE_URL}/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to login');
    }
    return await response.json();
  }

  async getUsersWorkspaces(token: string) {
    const response = await fetch(`${this.BASE_URL}/workspace/my`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Not authorized');
    }
    return await response.json();
  }

  async getCurrentWorkspace(shortname: string, token: string) {
    if (!token) {
      throw new Error('Not authorized');
    }
    const response = await fetch(`${this.BASE_URL}/workspace/${shortname}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Cant find workspace.');
    }
    return await response.json();
  }

  async createWorkspace(data: createWorkspaceSchema, token: string) {
    if (!token) {
      throw new Error('Not authorized');
    }
    const response = await fetch(`${this.BASE_URL}/workspace/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to create workspace');
    }
    return await response.json();
  }

  async editWorkspace(data: updateWorkspaceSchema, token: string) {
    if (!token) {
      throw new Error('Not authorized');
    }
    const response = await fetch(`${this.BASE_URL}/workspace/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to edit workspace');
    }
    return await response.json();
  }

  async createBoard(data: CreateBoardSchema, token: string) {
    if (!token) {
      throw new Error('Not authorized');
    }
    const response = await fetch(`${this.BASE_URL}/board/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to create board');
    }
    return await response.json();
  }

  async getBoardsInWorkspace(id: number, token: string) {
    const response = await fetch(`${this.BASE_URL}/board/byWorkspace/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to get boards');
    }
    return await response.json();
  }

  async getWorkspaceByBoardId(id: number) {
    const response = await fetch(`${this.BASE_URL}/workspace/byBoard/${id}`, {
      method: 'GET',
      headers: {},
    });
    if (!response.ok) {
      throw new Error('Failed to get boards');
    }
    return await response.json();
  }

  async getAttendedBoards(token: string) {
    const response = await fetch(`${this.BASE_URL}/board/attended`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to get boards');
    }
    return await response.json();
  }
}

export const api = new Api();
