
import './App.css'
import AllWarehousesComponent from './components/AllWarehousesComponent'
import PackageProvider from './context/packageContext';

function App() {

  return (
    <PackageProvider>
      <AllWarehousesComponent></AllWarehousesComponent>
    </PackageProvider>
  )
}

export default App
