import './App.css';
import Downloader from './components/downloader';

function App() {

  // Data which could be passed to the downloader component. Hard coding here for now.
  // On a real world scenario, this should come from a data store.
  const data = [
    {name: 'smss.exe', device: 'Stark', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe', status: 'scheduled'},
    {name: 'netsh.exe', device: 'Targaryen', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe', status: 'available'},
    {name: 'uxtheme.dll', device: 'Lanniester', path: '\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll', status: 'available'},
    {name: 'cryptbase.dll', device: 'Martell', path: '\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll', status: 'scheduled'},
    {name: '7za.exe', device: 'Baratheon', path: '\\Device\\HarddiskVolume1\\temp\\7za.exe', status: 'scheduled'},
    {name: 'netsh.exe', device: 'Targaryen', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe', status: 'available'},
    {name: 'uxtheme.dll', device: 'Lanniester', path: '\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll', status: 'available'},
  ];

  // Title that could be passed to the custom table component for heading.
  const th = ['', 'Name', 'Device', 'Path', '', 'Status'];

  const onDownload = (items) => {
    // Hook to get notified whenever customer says download.
    // Business logic to download shoudl come here, and update the data as well, to reflect status.
  };

  return (
    <div className="App">
      <h1>Downloader</h1>
      <Downloader data={data} title={th} onDownload={onDownload}/>
    </div>
  );
}

export default App;
