import { useEffect, useState } from "react";
import Header from "./components/Header";
import Card from "./components/Card";

export default function App(){

  const [deals, setDeals] = useState([])

  const getData = async () => {
    try {
      const response = await fetch('http://localhost:8000/deals')
      const data = await response.json()

      if(data){
        setDeals(data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=>{
    getData()
  },[])

  return (
    <div className="App">
      <Header />
      <nav>
        <button className="primary-btn">Amazon</button>
        <button className="primary-btn">Aliexpress</button>
        <button className="primary-btn">Ebay</button>
      </nav>
      <h1>{deals.length > 0 ? `${deals.length} Deals Available Today` : "No Deals Today"}</h1>
      <div className="card-area">
        {
          deals ? deals.map(deal => <Card key={deal.pos} deal={deal} />) : null
        }
      </div>
    </div>
  );
}
