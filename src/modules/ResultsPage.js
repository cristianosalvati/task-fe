import { useTable, useSortBy } from 'react-table';

function ResultsPage({ title, columns, data }) {
  const defaultSortBy = [
    {
      id: 'id', 
      desc: true,
    },
  ];

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { sortBy },
    setSortBy,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        sortBy: defaultSortBy, 
      },
    },
    useSortBy
  );

  return (
    <fieldset>
      <legend>{title || "Results:"}</legend>
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
              {rows.map(row => {
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
    </fieldset>
  );
}

export default ResultsPage;
