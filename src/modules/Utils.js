export function getFirstDayOfPreviousMonth(date) {
  date = date ?? new Date(); // Se non viene passata una data, usa quella odierna
  const dayOfPeriod = date; // Ottieni la data odierna
  const previousMonth = new Date(dayOfPeriod.getFullYear(), dayOfPeriod.getMonth() - 1, 1); // Sottrai un mese e imposta il giorno al 1
  const formattedDate = getFormattedStringFromDate(previousMonth);
  return formattedDate;
}

export function getLastDayOfPreviousMonth(date) {
  date = date ?? new Date(); // Se non viene passata una data, usa quella odierna
  const dayOfPeriod = date; // Ottieni la data odierna
  const previousMonth = new Date(dayOfPeriod.getFullYear(), dayOfPeriod.getMonth(), 0); // Sottrai un mese e imposta il giorno a 0 (che rappresenta l'ultimo giorno del mese precedente)
  const formattedDate = getFormattedStringFromDate(previousMonth);
  return formattedDate;
}

export function getFirstDayOfMonth(date) {
  date = date ?? new Date(); // Se non viene passata una data, usa quella odierna
  const dayOfPeriod = date;
  const month = new Date(dayOfPeriod.getFullYear(), dayOfPeriod.getMonth(), 1); // Sottrai un mese e imposta il giorno al 1
  const formattedDate = getFormattedStringFromDate(month);
  return formattedDate;
}

export function getLastDayOfMonth(date) {
  date = date ?? new Date(); // Se non viene passata una data, usa quella odierna
  const dayOfPeriod = date;
  const month = new Date(dayOfPeriod.getFullYear(), dayOfPeriod.getMonth() +1, 0); 
  const formattedDate = getFormattedStringFromDate(month);
  return formattedDate;
}

export function getDateFromFormattedString(formattedDate) {
  const [day, month, year] = formattedDate.split('-');
  return new Date(year, month - 1, day);
}

export function getFormattedStringFromDate(date) {
  date = date ?? new Date(); // Se non viene passata una data, usa quella odierna
  const day = String(date.getDate()).padStart(2, '0'); // Ottieni il giorno e formattalo con due cifre (es. '01')
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Ottieni il mese (0-based) e formattalo con due cifre (es. '01')
  const year = date.getFullYear(); // Ottieni l'anno
  return `${day}-${month}-${year}`;
}

export function getGenerateSelectedRowsAsString(data, selection) {
 // Filtriamo e mappiamo le righe selezionate
  const selectedRows = data
    .filter((row) => selection.includes(row.progId))
    .map((row) => {
      return `(Id: ${row.progId})`;
    });

  // Uniamo le righe selezionate in una singola stringa separata da virgole
  const selectedRowsString = selectedRows.join(',');

  return selectedRowsString;
}
  