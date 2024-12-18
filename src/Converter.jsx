import { useState, useRef } from "react";
import axios from "axios";

function Converter() {
  const rNum = useRef();
  const [amt, setAmt] = useState("");
  const [msg, setMsg] = useState("");

  const hAmt = (event) => {
    setAmt(event.target.value);
  };

  const convert = (event) => {
    event.preventDefault(); // Fix: Corrected method name from "event.preventdefault" to "event.preventDefault"

    if (amt === "") {
      alert("Please Enter the amount");
      setMsg("");
      rNum.current.focus();
      return;
    }

    let url = "https://api.exchangerate-api.com/v4/latest/USD"; // Correct API endpoint
    axios
      .get(url) // Correct usage of axios.get
      .then((res) => {
        let DOLLAR = res.data.rates.INR;
        let aid = parseFloat(amt);
        let air = aid * DOLLAR;
        let ans = "₹" + air.toFixed(2);
        setMsg(ans);
      })
      .catch((err) => {
        setMsg("Issue: " + err.message); // Improved error handling
      });
  };

  return (
    <>
      <center>
        <h1>Live Currency Converter</h1>
        <form onSubmit={convert}>
          <input
            type="number"
            step="0.01"
            placeholder="Enter amount in $"
            ref={rNum}
            onChange={hAmt}
          />
          <br /> <br />
          <input type="submit" value="Convert to ₹" />
        </form>
        <h2>{msg}</h2>
      </center>
    </>
  );
}

export default Converter;
