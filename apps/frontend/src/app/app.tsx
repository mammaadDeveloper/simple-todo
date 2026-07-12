import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface Todo {
  id: string;
  title: string;
  description: string;
  isDone: boolean;
}

interface TodoPayload {
  title: string;
  description: string;
}

const API_URL = 'http://localhost:3000/api';

const getTodos = async (): Promise<Todo[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }

  return response.json();
};

const createTodo = async (payload: TodoPayload): Promise<Todo> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to create todo');
  }

  return response.json();
};

const updateTodo = async (todo: Todo): Promise<Todo> => {
  const response = await fetch(`${API_URL}/${todo.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    throw new Error('Failed to update todo');
  }

  return response.json();
};

const deleteTodo = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete todo');
  }
};

export default function App() {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);

  const { data: todos = [], isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  });

  const createMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      });

      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      });

      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      });
    },
  });

  function resetForm() {
    setTitle('');
    setDescription('');
    setEditingTodoId(null);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    if (editingTodoId) {
      const currentTodo = todos.find((todo) => todo.id === editingTodoId);

      if (!currentTodo) {
        return;
      }

      updateMutation.mutate({
        ...currentTodo,
        title,
        description,
      });

      return;
    }

    createMutation.mutate({
      title,
      description,
    });
  }

  function handleEdit(todo: Todo) {
    setEditingTodoId(todo.id);
    setTitle(todo.title);
    setDescription(todo.description);
  }

  function handleToggle(todo: Todo) {
    updateMutation.mutate({
      ...todo,
      isDone: !todo.isDone,
    });
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10">
      <div className="mx-auto max-w-3xl px-4">
        <div className="rounded-xl bg-white p-6 shadow">
          <h1 className="mb-6 text-3xl font-bold">Todo List</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Title</label>

              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
                placeholder="Enter title..."
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Description
              </label>

              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows={4}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
                placeholder="Enter description..."
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
              >
                {editingTodoId ? 'Update Todo' : 'Add Todo'}
              </button>

              {editingTodoId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-lg bg-slate-200 px-4 py-2"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="mt-6 space-y-4">
          {isLoading && (
            <div className="rounded-lg bg-white p-4 shadow">Loading...</div>
          )}

          {!isLoading &&
            todos.map((todo) => (
              <div key={todo.id} className="rounded-xl bg-white p-5 shadow">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2
                      className={`text-lg font-semibold ${
                        todo.isDone ? 'line-through text-slate-400' : ''
                      }`}
                    >
                      {todo.title}
                    </h2>

                    <p className="mt-2 text-slate-600">{todo.description}</p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggle(todo)}
                      className={`rounded-lg px-3 py-2 text-white ${
                        todo.isDone ? 'bg-amber-500' : 'bg-green-600'
                      }`}
                    >
                      {todo.isDone ? 'Undo' : 'Done'}
                    </button>

                    <button
                      onClick={() => handleEdit(todo)}
                      className="rounded-lg bg-blue-600 px-3 py-2 text-white"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteMutation.mutate(todo.id)}
                      className="rounded-lg bg-red-600 px-3 py-2 text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}

          {!isLoading && todos.length === 0 && (
            <div className="rounded-lg bg-white p-6 text-center shadow">
              No todos found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
