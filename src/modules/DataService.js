import axios from 'axios';
import { API_URLS } from './ApiConfig';

// FE client implementation for BE API 

export async function getAllEmployees (){
  try {
    const url = API_URLS.getAllEmployees;
    const method = 'GET';  
    const requestBody = null
  
    return fetchApiData(url, method, requestBody).then((data) =>
      data.map((item) => ({
        id: item.id,
        firstName: item.firstName,
        lastName: item.lastName,
        role: item.role,
        email: item.email,
        dateInsert: item.dateInsert,
      }))
    );
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export async function findTasks (searchFilter){
  try {
    const url = API_URLS.findTasks;
    const method = 'POST';  
    const requestBody = searchFilter;
    //TODO: check filter parameter 

    return fetchApiData(url, method, requestBody, false).then((data) =>
    data.map((item) => {
      const employeeTasks = item.employeeTaskList.map((task) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        taskStatus: task.taskStatus,
        dueDate: task.dueDateS,
        manager: task.manager?.lastName,
        email: task.manager?.email,
        dateInsert: task.dateInsertS,
        employees: true,
        employeesList: task.employees
      }));
      return employeeTasks;
    })
    );

  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};


export async function assignEmployeeToTask (employeeId, taskId, isAssign){
  try {
    console.log(`DataService -> assignEmployeeToTask -> employeeId = ${employeeId},taskId = ${taskId}`); 
    
    const url = (isAssign ? API_URLS.assignEmployeeToTask(employeeId, taskId) : API_URLS.unassignEmployeeToTask(employeeId, taskId));
    const method = 'POST';
    const requestBody =  null;

    const response = await axios({
      method: method,
      url: url,
      data: requestBody,
    });
      
    if (response.data.status === 'SUCCESS') {
      // Return response in case of success
      return response.data.items[0];
    } else {
      throw new Error(response.data.items[0].description); 
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export async function updateTaskDueDate (taskId, dueDate){
  try {
    console.log(`DataService -> updateTaskDueDate -> taskId = ${taskId}`); 
    const FormData = require('form-data');
    let data = new FormData();
    data.append('newDueDate', dueDate);
    const url = API_URLS.updateTaskDueDate(taskId);
    const method = 'POST';

    const response = await axios({
      method: method,
      url: url,
      headers: {
        // some header props here
      },
      data: data,
      maxBodyLength: Infinity,
    });
      
    if (response.data.status === 'SUCCESS') {
      // Return response in case of success
      return response.data.items[0];
    } else {
      throw new Error(response.data.items[0].description); 
    }

  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export async function createEmployee (employee){
  try {
    console.log(`DataService -> createEmployee -> employee -> ${JSON.stringify(employee, null, 2)}`); 

    const url = API_URLS.createEmployee;
    const method = 'PUT';
    const response = await axios({
        method: method,
        url: url,
        data: employee,
    });
      
    if (response.data.status === 'SUCCESS') {
      // Return response in case of success
      return response.data.items[0];
    } else {
      throw new Error(response.data.items[0].description); 
    }
  } catch (error) {
    console.error('API Request Error:', error);
      throw new Error(`Causa: ${error.message}`);
  }
};

export async function createTask (task){
  try {
    console.log(`DataService -> createTask -> task -> ${JSON.stringify(task, null, 2)}`); 

    const url = API_URLS.createTask;
    const method = 'PUT';
    const response = await axios({
        method: method,
        url: url,
        data: task,
    });
      
    if (response.data.status === 'SUCCESS') {
      // Return response in case of success
      return response.data.items[0];
    } else {
      throw new Error(response.data.items[0].description); 
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export async function deleteEmployeeById (employeeId){
  try {
    console.log(`DataService -> deleteEmployeeById -> employeeId -> ${employeeId}`); 

    const url = API_URLS.deleteEmployeeById(employeeId);
    const method = 'DELETE';
    const requestBody = null;

    const response = await axios({
      method: method,
      url: url,
      data: requestBody,
    });
      
    if (response.data.status === 'SUCCESS') {
      // Return response in case of success
      return response.data.items[0];
    } else {
      throw new Error(response.data.items[0].description); 
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export async function deleteTaskById (taskId){
  try {
    console.log(`DataService -> deleteTaskById -> taskId -> ${taskId}`); 

    const url = API_URLS.deleteTaskById(taskId);
    const method = 'DELETE';
    const requestBody =  null;

    const response = await axios({
      method: method,
      url: url,
      data: requestBody,
    });
      
    if (response.data.status === 'SUCCESS') {
      // Return response in case of success
      return response.data.items[0];
    } else {
      throw new Error(response.data.items[0].description); 
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

async function fetchApiData(url, method = 'GET', requestBody = null, filtered = true) {
  try {
    console.log(`DataService -> fetchApiData: method -> ${method} ; url -> ${url} ; requestBody -> ${JSON.stringify(requestBody, null, 2)}`); 

    const config = {
      method,
      url
    };

    if (method === 'POST' && requestBody) {
      config.data = requestBody;
    }

    const response = await axios(config);

    if (response.data.status === 'SUCCESS') {
      //return response.data.items;
      const data = response.data.items;
      console.log(`DataService -> fetchApiData: method -> ${method} ; url -> ${url} ; responseBody -> ${JSON.stringify(data, null, 2)}`); 

      if (!filtered) return data;

      const uniqueIds = new Set();
      const filteredData = data.filter((item) => {
        if (!uniqueIds.has(item.id)) {
          uniqueIds.add(item.id);
          return true;
        }
        return false;
      });

      return filteredData;
    }
    
    console.debug('DataService -> fetchApiData: API Reponse error:', JSON.stringify(response.data, null, 2)); 
    return [];
  } catch (error) {
    console.error('DataService -> fetchApiData: API Request error:', error);
    return [];
  }
}