import React, { Component } from 'react';
import { getAllEmployees, findTasks, assignEmployeeToTask, updateTaskDueDate, createEmployee, createTask, deleteEmployeeById, deleteTaskById} from '../../modules/DataService';
import Modal from '../../modules/Modal';
import ResultsPage from '../../modules/ResultsPage';
import trashIcon from '../../images/trash.gif';
import addIcon from '../../images/add.png';
import removeIcon from '../../images/remove.gif';

// PAGE TO MANAGE TASKS AND EMPLOYEES

class TaskPage extends Component {

    state = {  
        modalDisplayed: false,
        modalConfirmEnable: false,
        modalOperationId: '',
        modalMessage: '',
        modalDetail: null,
        modalContent: null,
        modalIsLoading: false,
        taskData: [],
        selectedTask: null,
        newUpdateDateS: null,
        employeeData:[],
        dueDateInputValues: {}, 
    };

    componentDidUpdate(prevProps, prevState) {
        console.log(`this.state: ${JSON.stringify(this.state, null, 1)}`);
    }

    componentDidMount() {
        this.setState({
            modalDisplayed: false,
            modalConfirmEnable: false,
            modalOperationId: '',
            modalMessage: '',
            modalDetail: null,
            modalContent: null,
            modalIsLoading: false,
            taskData: [],
            selectedTask: null,
            dueDateInputValues: {}, // array containing due date to update
        });
        this.fetchlEmployeesData();
        this.fetchTaskData().then((taskData) => {
            this.setState({
                taskData: taskData.map((task) => ({
                    ...task,
                })),
            });
        });
    }

    fetchTaskData = async () => {
        try {
            // TODO: implement a searchFIlter parameter to filtering task grid
            const searchFilter = { };
            let taskData = await findTasks(searchFilter); 
            taskData = taskData[0];
            
            //initializing due date for any grid's row
            const dueDateInputValues = {};
            taskData.forEach((task) => {
                dueDateInputValues[task.id] = task.dueDate;
            });

            this.setState({ taskData, dueDateInputValues }); 
        } catch (error) {
            this.setState({
                taskData: [],
                modalDetail: null,
                modalContent: null,
                modalIsLoading: false,
                modalDisplayed: true,
                modalMessage: error.message,   
                modalConfirmEnable: false,
                modalOperationId:   "Errore",
            });  
        }
    };

    fetchlEmployeesData = async () => {
        try {
            const employeeData = await getAllEmployees(); 
            this.setState({employeeData: employeeData});
        } catch (error) { 
            this.setState({
                modalDetail: null,
                modalContent: null,
                modalIsLoading: false,
                modalDisplayed: true,
                modalMessage: error.message,   
                modalConfirmEnable: false,
                modalOperationId:   "Errore",
                employeeData: [],
            });  
        }
    };

    callCreateTask = async () => {
        try {
         // TODO: let's use client to call BE API
        } catch (error) { 
            this.setState({
                modalDetail: null,
                modalContent: null,
                modalIsLoading: false,
                modalDisplayed: true,
                modalMessage: error.message,   
                modalConfirmEnable: false,
                modalOperationId:   "Errore",
            });  
        }
    };

    callDeleteTask = async () => {
        try {
         // TODO: let's use client to call BE API
        } catch (error) { 
            this.setState({
                modalDetail: null,
                modalContent: null,
                modalIsLoading: false,
                modalDisplayed: true,
                modalMessage: error.message,   
                modalConfirmEnable: false,
                modalOperationId:   "Errore",
            });  
        }
    };

    calAssignEmployeeToTask = async (taskId, employeeId, isAssign) => {
        try {
        // TODO: manage response message 
            await assignEmployeeToTask(employeeId, taskId, isAssign).then(() => {
                this.fetchTaskData();
              });
            ; 
            this.setState({
                modalDisplayed: false,
            });  

        } catch (error) { 
            this.setState({
                modalDetail: null,
                modalContent: null,
                modalIsLoading: false,
                modalDisplayed: true,
                modalMessage: error.message,   
                modalConfirmEnable: false,
                modalOperationId:   "Errore",
            });  
        }
    };

    callUpdateTaskDueDate = async (taskId, dueDate) => {
        try {
            await updateTaskDueDate(taskId, dueDate).then(() => {
                this.fetchTaskData();
            });
            ; 
        } catch (error) { 
            this.setState({
                modalDetail: null,
                modalContent: null,
                modalIsLoading: false,
                modalDisplayed: true,
                modalMessage: error.message,   
                modalConfirmEnable: false,
                modalOperationId:   "Errore",
            });  
        }
    };

    handleCreateTaskClick = (taskData) => {
        // TODO implement it, check task data and callCreateTask api to send data to BE
    };

    handleDeleteTaskClick = (taskData) => {
        // TODO implement it, check task data and callDeleteTask api to send data to BE
    };

    handleAssignTaskClick = (row) => {
        this.fetchlEmployeesData();
        let content = (
            <div className="container">
                 <ul>
                    {this.state.employeeData.map(employee => (
                        <li key={employee.id}>
                        {employee.firstName} {employee.lastName} - {employee.role} -

                        <button 
                            title={`Assigned to task n. ${row.id}: ${row.title}`} 
                            style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0, margin: 0 }}
                            onClick={() => this.calAssignEmployeeToTask(row.id, employee.id, true)}
                            type="button" >
                            <img src={addIcon} 
                                alt={`Aassigned to task n. ${row.id} per ${row.title}`} 
                                data-tip="See employees" 
                                data-for={`tooltip-${row.id}`}
                            />
                            </button>

                        </li>
                    ))}
                    </ul>
            </div>
        );
        this.setState({
            modalDisplayed: true,
            modalOperationId: `Assign Employee`,
            modalMessage: `Add employee to task n. ${row.id}: "${row.title}"`,
            modalConfirmEnable: false,
            modalContent: content,
            modalDetail: null,
            modalIsLoading: false,
            rettificaSelezionata: row.progId,
        });
    };

    handleUnassignTaskClick = (row) => {
        //TODO refactor in a singol method with handleAssignTaskClick
        let content = (
            <div className="container">
                 <ul>
                    {row.employeesList.map(employee => (
                        <li key={employee.id}>
                        {employee.firstName} {employee.lastName} - {employee.role} -

                        <button 
                            title={`Employees unassigned to task n. ${row.id}: ${row.title}`} 
                            style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0, margin: 0 }}
                            onClick={() => this.calAssignEmployeeToTask(row.id, employee.id, false)}
                            type="button" >
                            <img src={trashIcon} 
                                alt={`Employees unassigned to task n. ${row.id} per ${row.title}`} 
                                data-tip="See related employees" 
                                data-for={`tooltip-${row.id}`}
                            />
                            </button>

                        </li>
                    ))}
                    </ul>
            </div>
        );
        this.setState({
            modalDisplayed: true,
            modalOperationId: `Unassign Employee`,
            modalMessage: `Employees list for task n. ${row.id}: "${row.title}"`,
            modalConfirmEnable: false,
            modalContent: content,
            modalDetail: null,
            modalIsLoading: false,
            rettificaSelezionata: row.progId,
        });
    };

    handleUpdateTaskDueDateChange = (e, taskId) => {
        const { dueDateInputValues } = this.state;
        const newDueDateInputValues = {
            ...dueDateInputValues,
            [taskId]: e.target.value,
        };
        this.setState({ dueDateInputValues: newDueDateInputValues });
    };
          
    confirmModal = () => {
        try {
            this.setState({ 
                modalIsLoading: true ,
                modalConfirmEnable: false,
            });
            // TODO: manage here call to action on modal confirm 
          
        } catch (error) { 
            this.setState({
                modalDetail: null,
                modalContent: null,
                modalIsLoading: false,
                modalDisplayed: true,
                modalMessage: error.message,   
                modalConfirmEnable: false,
                modalOperationId:   "Errore",
            });
        }
    };

    closeModal = () => {
        this.setState({
            modalMessage: "",
            modalOperationId: '',
            modalDisplayed: false,
            modalConfirmEnable: false,
            modalDetail: null,
            modalIsLoading: false,
          });
    };

    render() {
        // header definition for result grid 
        const columns = [
            { Header: 'Id',  accessor: 'id', },
            { Header: 'Title',  accessor: 'title', },
            { Header: 'Description', accessor: 'description', },
            { Header: 'Task Status', accessor: 'taskStatus', },
            { Header: 'Due Date', accessor: 'dueDate', 
                Cell: ({ row }) => (
                    <div style={{  display: 'flex', alignItems: 'center' }}>
                        <input
                            type="date"
                            id={`duedate-${row.original.id}`}
                            name="due-date"
                            value={this.state.dueDateInputValues[row.original.id]}
                            placeholder="yyyy-MM-dd"
                            onChange={(e) => this.handleUpdateTaskDueDateChange(e, row.original.id)}
                        />
                        <button     
                            title={`Update due date for task n. ${row.original.id}`} 
                            style={{float: 'right', cursor: 'pointer', background: 'none', border: 'none', padding: 0, margin: 0 }}
                            onClick={() => this.callUpdateTaskDueDate(row.original.id, this.state.dueDateInputValues[row.original.id])}
                            type="button" >
                            <img src={addIcon} 
                                alt={`Update due date`} 
                                data-tip="Update due date" 
                            />
                        </button>
                    </div>
                ),
            },
            { Header: 'Manager ref.', accessor: 'manager', },
            { Header: 'Man. email', accessor: 'email', },
            { Header: 'Date Insert', accessor: 'dateInsert', }, 
            { Header: ' ', accessor: 'employees', 
              Cell: ({ row }) => (
                <button 
                  title={`Unassign employee from task n. ${row.original.id}: ${row.original.title}`} 
                  style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0, margin: 0 }}
                  onClick={() => this.handleUnassignTaskClick(row.original)}
                  type="button" >
                  <img src={removeIcon} 
                    alt={`Unassign employes from task n. ${row.original.id} per ${row.original.title}`} 
                    data-tip="See related employees to unasign.. " 
                    data-for={`tooltip-${row.original.id}`}
                  />
                </button>
              ),
            },
            { Header: ' ', accessor: 'addEmployee', 
                Cell: ({ row }) => (
                <button 
                    title={`Assign employees to task n. ${row.original.id}: ${row.original.title}`} 
                    style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0, margin: 0 }}
                    onClick={() => this.handleAssignTaskClick(row.original)}
                    type="button" >
                    <img src={addIcon} 
                    alt={`Assign employees to task n. ${row.original.id}: ${row.original.title}`} 
                    data-tip="Assign employees.." 
                    data-for={`tooltip-${row.original.id}`}
                    />
                </button>
                ),
            },
        ];    

        // GUI definition

        return ( 
            <div className="container">
                <form action="/task">
                    <div className="form-container">
                        <fieldset>
                            <legend> Task manager </legend>
                                <div className="row">
                                    <div className="col-12">
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-2">
                                        <input
                                            id="searchFilter"
                                            name="searchFilter"
                                            disabled={true} 
                                            value=""
                                            placeholder="Implement it to filter results"
                                        />
                                    </div>
                                    <div className="col-2">
                                    </div>
                                    <div className="col-2">
                                        <label>Create new task</label>
                                    </div>
                                    <div className="col-1">
                                    <button 
                                        title={`create new task`} 
                                        style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0, margin: 0 }}
                                        onClick={() => this.handleCreateTaskClick()}
                                        type="button" >
                                        <img src={addIcon} 
                                            alt={`create new task`} 
                                            data-tip="Create new task" 
                                        />
                                        </button>
                                    </div>
                                    <div className="col-1">
                                        
                                    </div>
                                    <div className="col-2">
                                        <label>Delete task</label>
                                    </div>
                                    <div className="col-1">
                                    <button 
                                        title={`delete task`} 
                                        style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0, margin: 0 }}
                                        onClick={() => this.handleDeleteTaskClick()}
                                        type="button" >
                                        <img src={removeIcon} 
                                            alt={`delete task`} 
                                            data-tip="Delete task" 
                                        />
                                        </button>
                                    </div>
                                    <div className="col-1">
                                        
                                    </div>
                                </div>
                        </fieldset>
                        { /* if retrieve any data then show it in a result grid  */ }
                        {(this.state.taskData.length > 0) && (
                            <>
                                <fieldset>
                                    <ResultsPage 
                                        title="Task list"
                                        columns={columns} 
                                        data = {this.state.taskData}
                                        />
                                </fieldset>
                            </>
                        )}
                    </div>
                </form>
                { /* if Modal is turned on display it */ }
                {this.state.modalDisplayed && ( 
                    <Modal
                        modalDisplayed={this.state.modalDisplayed}
                        onClose={this.closeModal}
                        onConfirm={this.confirmModal}
                        modalConfirmEnable={this.state.modalConfirmEnable}
                        title={this.state.modalOperationId}
                        message={this.state.modalMessage}
                        modalDetail={this.state.modalDetail}
                        modalContent={this.state.modalContent}
                        modalIsLoading={this.state.modalIsLoading}
                    />
                )}
            </div>             
        );
    }
}

export default TaskPage;