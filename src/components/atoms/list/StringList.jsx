import React from 'react';

function StringList(props) {
  const { strings, limit } = props;

   // checking if empty string
   if (!strings || strings.length === 0) {
    return <ul></ul>;
  }else if (limit !== null && typeof limit === 'number' && limit >= 0  && limit < strings.length ) { 
    // there is a limit?
    const limitedStrings = strings.slice(0, limit);

    return (
      <ul>
        {limitedStrings.map((string, index) => (
          <li key={index}>{string}</li>
        ))}
        <li>...</li>
      </ul>
    );
  }else {
    // print all if no limit 
    return (
      <ul>
        {strings.map((string, index) => (
          <li key={index}>{string}</li>
        ))}
      </ul>
    );
  }
}

export default StringList;