import React, { Component } from 'react';
import { getDateFromFormattedString, getFirstDayOfMonth, getLastDayOfMonth} from '../../modules/Utils';
import { getAllEmployees, findTasks, createEmployee, createTask, deleteEmployeeById, deleteTaskById, assignEmployeeToTask, updateTaskDueDate} from '../../modules/DataService';
import { Link } from 'react-router-dom';
import Modal from '../../modules/Modal';
import ResultsPage from '../../modules/ResultsPage';
import Button from '../../components/atoms/clickable/Button';
import Label from '../../components/atoms/caption/Label';
import trashIcon from '../../images/trash.gif';
import addIcon from '../../images/add.png';
import loadIcon from '../../images/loading.gif';
import detailIcon from '../../images/detail.gif';

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
        });
        this.fetchTaskData();
    }

    fetchTaskData = async () => {
        try {
            // TODO: implement a searchFilter parameter
            const searchFilter = { };
            const taskData = await findTasks(searchFilter); 
            this.setState({ taskData }); 
        }catch (error) {
            this.setState({
                taskData : [],
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

    callCreateTask = async () => {
        try {

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

    callGetAllEmployees = async () => {
        try {
            
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

    calAssignEmployeeToTask = async () => {
        try {
            
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

    callAssignEmployeeToTask  = async () => {
        try {
            
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

    handleAssignTaskClick = (row) => {
        let content = (
            <div className="container">
                
            </div>
        );
        this.setState({
            modalDisplayed: true,
            modalOperationId: `Employees List`,
            modalMessage: `Employees list for task n. ${row.id}: ${row.title}?`,
            modalConfirmEnable: true,
            modalContent: null,
            modalDetail: null,
            modalIsLoading: false,
            rettificaSelezionata: row.progId,
        });
    };

    handleUnassignTaskClick = (row) => {
        let content = (
            <div className="container">
                
            </div>
        );
        this.setState({
            modalDisplayed: true,
            modalOperationId: `Employees List`,
            modalMessage: `Employees list for task n. ${row.id}: ${row.title}?`,
            modalConfirmEnable: true,
            modalContent: null,
            modalDetail: null,
            modalIsLoading: false,
            rettificaSelezionata: row.progId,
        });
    };

    confirmModal = () => {
        try {
            this.setState({ 
                modalIsLoading: true ,
                modalConfirmEnable: false,
            });
            if (this.state.modalOperationId === "Employees List")
                this.callGetAllEmployees();
            if (this.state.modalOperationId === "Assign Employee")
                this.calAssignEmployeeToTask(false);
            if (this.state.modalOperationId === "Unassign Employee")
                this.calAssignEmployeeToTask(true);
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
        const columns = [
            { Header: 'Id',  accessor: 'id', },
            { Header: 'Title',  accessor: 'title', },
            { Header: 'Description', accessor: 'description', },
            { Header: 'Task Status', accessor: 'taskStatus', },
            { Header: 'Due Date', accessor: 'dueDate', },
            { Header: 'Manager ref.', accessor: 'manager', },
            { Header: 'Man. email', accessor: 'email', },
            { Header: 'Date Insert', accessor: 'dateInsert', }, 
            { Header: ' ', accessor: 'employees', 
              Cell: ({ row }) => (
                <button 
                  title={`Employees assigned to task n. ${row.original.id}: ${row.original.title}`} 
                  style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0, margin: 0 }}
                  onClick={() => this.handleDeleteTaskClick(row.original)} >
                  <img src={detailIcon} 
                    alt={`Employees assigned to task n. ${row.original.id} per ${row.original.title}`} 
                    data-tip="See related employees" 
                    data-for={`tooltip-${row.id}`}
                  />
                </button>
              ),
            },
        ];    

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
                                    <div className="col-12">
                                    </div>
                                </div>
                        </fieldset>
                        {(this.state.taskData.length > 0) && (
                            <>
                                <fieldset>
                                    <ResultsPage 
                                        title="Task list"
                                        columns={columns} 
                                        data = {this.state.taskData}
                                        defaultPageSize = {30}
                                        />
                                </fieldset>
                            </>
                        )}
                    </div>
                </form>
                {this.state.modalDisplayed && ( 
                    <Modal
                        modalDisplayed={this.state.modalDisplayed}
                        onClose={this.closeModal}
                        onConfirm={this.confirmModal}
                        modalConfirmEnable={this.state.modalConfirmEnable}
                        title={this.state.modalOperationId}
                        message={this.state.modalMessage}
                        modalDetail={this.state.modalDetail}
                        modalIsLoading={this.state.modalIsLoading}
                    />
                )}
            </div>             
        );
    }
}

export default TaskPage;