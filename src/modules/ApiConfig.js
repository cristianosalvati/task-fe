const LOCAL_API_BASE_URL = process.env.REACT_APP_API_URI;

const API_BASE_URL = window.env?.API_BASE_DOMAIN_ADDR ? window.env.API_BASE_DOMAIN_ADDR : LOCAL_API_BASE_URL;

export const API_URLS = {
  getAllEmployees: `${API_BASE_URL}/api/employees/all`, 
  findTasks: `${API_BASE_URL}/api/tasks/find`,
  createEmployee: `${API_BASE_URL}/api/employees/create`,
  createTask: `${API_BASE_URL}/api/tasks/create`,
  deleteEmployeeById: (employeeId) => 
    `${API_BASE_URL}/api/employees/delete/${employeeId}`,
  deleteTaskById: (taskId) => 
    `${API_BASE_URL}/api/tasks/delete/${taskId}`,
  assignEmployeeToTask: (employeeId, taskId) => 
    `${API_BASE_URL}/api/tasks/assign/${employeeId}/to/${taskId}`,
  unassignEmployeeToTask: (employeeId, taskId) => 
    `${API_BASE_URL}/api/tasks/unassign/${employeeId}/from/${taskId}`,
  updateTaskDueDate: (taskId) => 
    `${API_BASE_URL}/api/tasks/api/tasks/due-date/${taskId}`,
};
