import React from 'react';
import CustomTable from './customTable';
import 'font-awesome/css/font-awesome.min.css';
import Modal from 'react-modal';

const Downloader = ({data, title}) => {

  const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

  const [modalIsOpen,setModelIsOpen] = React.useState(false);
  const [modalContent, setModalContent] = React.useState([]);
  const [selected, setSelected] = React.useState(new Array(data.length).fill(false));
  const [allChecked, setAllChecked] = React.useState(false);

  React.useEffect(() => {
    if(! selected.find((item) => (item))) {
      setAllChecked(false);
    }
  }, [selected]);

  const handleChange = (idx) => {
    let selectedCopy = [...selected];
    selectedCopy[idx] = !selectedCopy[idx];
    setSelected(selectedCopy);
  };

  const handleAllChecked = () => {
    setAllChecked(!allChecked);
    let selectedCopy = selected.map((item, idx) => {
      if(data[idx].status.toLowerCase() === 'available') {
        return !allChecked;
      }
      return false;
    });

    setSelected(selectedCopy);
  };

  const getSelectedCount = () => {
    let count = 0;
    selected.forEach((item) => {
      if(item) {
        count++;
      }
    });
    return count;
  };

  const tableData = [];
  for(let i = 0; i < data.length; i++) {
    let row = [];
    if(data[i].status.toLowerCase() === 'available') {
      row.push(<input type="checkbox" checked={selected[i] || false} onChange={() => handleChange(i)} />)
    }
    else {
      row.push('');
    }

    for(let key in data[i]) {
      if(key === 'status') {
        if(data[i][key].toLowerCase() === 'available') {
          row.push(<i className="fa fa-circle green-color " ></i>);
        }
        else {
          row.push('');
        }
      }
      row.push(data[i][key]);
    }
    
    tableData.push(row);
  }

  const handleDownloadClick = () => {
    let alertStr = [];
    for(let i = 0; i < selected.length; i++) {
      if(selected[i]) {
        alertStr.push([data[i].path, data[i].device]);
      }
    }
    setModelIsOpen(true);
    setModalContent(alertStr);
  };

  const rowCls = selected.map((item) => {
    return item ? 'row-highlighted' : '';
  });

  const closeModal = () => {
    setModalContent([]);
    setModelIsOpen(false);
  };

  return (
     <div>
      <div className="main-div">
        <div className="paddingCls">
          <label>
            <input type="checkbox" name="checkbox" value="value" checked={allChecked} onChange={handleAllChecked} />
            Selected {`${getSelectedCount() ? getSelectedCount() : 'None'}`}
          </label>
        </div>

        <button disabled={!selected.find((s) => s)} className="paddingCls" onClick={handleDownloadClick}>
          <i className="fas fa-download"></i>
          <label>Download Selected</label>
        </button>
        <Modal
          isOpen={modalIsOpen}
          style={customStyles}
          ariaHideApp={false}
        >
          <h2>Downloading...</h2>
          {modalContent.map((item, idx) => (
            <div key={idx}>
              <div>
                <b>Path : </b>{item[0]}
              </div>
              <div>
                <b>Device : </b> {item[1]}
              </div>
              <br/>
            </div>
          ))}
          <button className="paddingCls" onClick={closeModal}>Close</button>
        </Modal>
      </div>
      <CustomTable title={title} data={tableData} rowCls={rowCls} />
    </div>

  )
};

export default Downloader;
