import { useTable, usePagination, useSortBy} from 'react-table';
//import { Link, useLocation } from 'react-router-dom';

function ResultsPage({title, columns, data, defaultPageSize}) {
  
  //const location = useLocation();
  //const currentPath = location.pathname.endsWith("/") ? location.pathname : location.pathname + "/" ;
  const defaultSortBy = [
    {
      id: 'id', // ID della colonna predefinita
      desc: true, // Imposta a true se desideri un ordinamento discendente predefinito
    },
  ];

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    /* Paginazione */
    page, // Estrae la pagina corrente
    nextPage, // Funzione per andare alla pagina successiva
    previousPage, // Funzione per tornare alla pagina precedente
    canNextPage, // True se è possibile andare alla pagina successiva
    canPreviousPage, // True se è possibile tornare alla pagina precedente
    pageOptions, // Opzioni delle pagine disponibili
    state: { pageIndex, pageSize, sortBy}, // Stato della paginazione
    setSortBy,
  } = useTable(
    {
    columns,
    data,
    initialState: {
        pageSize: defaultPageSize || data?.length, // Imposta la dimensione pagina predefinita a 30, data.length,
        sortBy: defaultSortBy, // Imposta l'ordinamento predefinito
    },
    }, useSortBy, usePagination);

  return (
    <fieldset>
        <legend>{title || "Risultati:"}</legend>
        <div className="row">
            <div className="results-container">
                <table {...getTableProps()} style={{ width: '100%' }}>
                    <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())} >
                                {column.render('Header')}
                                <span>
                                    {column.isSorted
                                    ? column.isSortedDesc
                                        ? ' ▼' // Indica l'ordinamento discendente
                                        : ' ▲' // Indica l'ordinamento ascendente
                                    : ' '}
                                </span>
                            </th>
                        ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                        prepareRow(row);
                        return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                            return (
                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            );
                            })}
                        </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
        <br/>
        <div >
           {/** TODO pagination here*/}
        </div>
    </fieldset>
  );
}

export default ResultsPage;
