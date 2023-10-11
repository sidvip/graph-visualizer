import "./App.css";
import Grp from "./images/grp.svg";
import Logo from './images/logo.svg';
import Address from './images/address.svg';
import LeftInfo from './images/left-info.svg';
import RightInfo from './images/right-info.svg';
import GraphLogo from './images/grp-logo.svg';
import LinkButton from './images/button.svg';
import { useEffect, useRef } from "react";
import { useState } from "react";
import ArrestChart from "./chart";

function App() {

  const [data, setData] = useState(null);
  const [isGrp, showGrp] = useState(false);
  const [isPrinting, setPrinting] = useState(false);
  const a4Ref = useRef();
  const API_URI = `https://api.usa.gov/crime/fbi/cde/arrest/state/AK/all?from=2015&to=2020&API_KEY=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv`;
  useEffect(() => {
    fetch(API_URI).then(r => r.json())
      .then(setData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div>
      {isPrinting ? <div style={{
        position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, background: 'black', color: 'white', opacity: 0.7, display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <h1>
          Printing in progress ...
        </h1>
      </div> : null}
      {isGrp ?
        (data && <div className="a4" ref={a4Ref}>
          <header className="hf">
            <img src={Logo} alt="realestate" />
            <img src={Address} alt="realestate-address" />
          </header>
          <hr className="hr" />
          <main>
            <div>
              <img src={Grp} alt="grp-1" className="grp" />
              <img src={Grp} alt="grp-2" className="grp" />
              <img src={Grp} alt="grp-3" className="grp" />
            </div>

            <div className="graph-main">
              <div className="grp-header">
                <img src={GraphLogo} alt="graph-logo" />
                <div className="title">{data?.title}</div>
                <hr className="hr" />
              </div>

              <div className="graph-area">
                <div className="graph-area-title">Burglary</div>
                <div className="grp-label-drawing-area">
                  <div className="legend">
                    <span>Arrests</span>
                  </div>
                  <ArrestChart chartData={data} setPrinting={setPrinting} />
                </div>
              </div>
            </div>
          </main>

          <hr className="hr" />
          <footer className="hf">
            <img src={LeftInfo} alt="left-info" />
            <img src={RightInfo} alt="right-info" />
          </footer>
        </div>)
        :
        <div className="button-print">
          <img src={LinkButton} alt="print" onClick={() => showGrp(true)} />
        </div>}
    </div>
  );
}

export default App;
