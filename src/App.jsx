import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Papa from 'papaparse';
import Prices from './components/Prices';
import Profile from './components/Profile';
import Navbar from './components/NavBar';
import 'ldrs/quantum';
import './index.css';

function App() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    axios
      .get('https://docs.google.com/spreadsheets/d/e/2PACX-1vTFApX9_jiA9eEJ31Y42kQYgLJCP3cCPCtaqPVrmc6Q7nRLOS99WNnUPvZQhtSpm8Zy7KIfvLCbmL4c/pub?gid=52002163&single=true&output=csv')
      .then(res => {
        const data = Papa.parse(res.data, { header: true }).data;
        setPrices(data);
        setLoading(false);
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", width: "100vw"}}>
        <l-quantum size="45" speed="1.75" color="black"></l-quantum>
      </div>
    )
  }
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar />
        <Profile />
        <Prices loading={loading} setLoading={setLoading} prices={prices} setPrices={setPrices} />
      </motion.div>
    </>
  );
}

export default App;
