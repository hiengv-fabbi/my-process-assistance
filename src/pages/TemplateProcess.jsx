import React, { useEffect, useState } from 'react';
import fromCDN from 'from-cdn';

import BluePrintProcess from '../components/blueprint/BluePrintProcess';
import '../App.css';
import '../static/css/frameProcess.css'
import Button from '../components/Button';

const LINK_CDN = [
  'https://webix.io/dev/dhtmlx/diagram/diagram_4.0/codebase/diagramWithEditor.css',
  'https://webix.io/dev/dhtmlx/diagram/diagram_4.0/codebase/diagramWithEditor.js',
];

function TemplateProcess() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const readyPromise = fromCDN(LINK_CDN);
    readyPromise.then(() => {
      console.log('The DHX library has been loaded...')
      setLoaded(true);
    });
  }, []);

  return (
    <>
      <section className="dhx-container">
        <div className="dhx-container_header">
          <Button name={'hello'} onClick={() => console.log('hello')} />
        </div>
        {loaded && <BluePrintProcess />}
      </section>
    </>
  );
}

export default TemplateProcess;
