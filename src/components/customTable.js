import React from 'react';

const RowData = ({row}) => {

  return (
      (function() {
        let cell = [];

        for(let j = 0; j < row.length; j++) {
          let cellId = `cell-${j}`;
          cell.push(<td key={cellId} >{row[j]}</td>)
        }
        return cell;
      })()
  )
};

const CustomTable = ({title, data, rowCls}) => {

  return (
    <table >
      <tbody>
      <tr>
        {
          title.map((t, idx) => {
            return (<th key={`title-${idx}`}>{t}</th>)
          })
        }
      </tr>
      {
        (function() {
          let rows = [];
          for(let i = 0; i < Number(data.length); i++) {
            let rowId = `row-${i}`
            rows.push(<tr id={rowId} key={rowId} className={rowCls[i]} >
              {
                <RowData row={data[i]} />
              }
            </tr>);
          }
          return rows;
        })()
      }
      </tbody>
    </table>
  );
}

export default CustomTable;
