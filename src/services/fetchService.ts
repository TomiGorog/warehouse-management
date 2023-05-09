export const fetchPackages = () => {
  return  fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            
}