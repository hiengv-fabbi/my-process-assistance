import React, { useEffect, useRef } from 'react';
import fromCDN from 'from-cdn';

// import { swimlineData } from '../static/data';

const LinkCdn = [
  'https://webix.io/dev/dhtmlx/diagram/diagram_4.0/codebase/diagramWithEditor.css',
  'https://webix.io/dev/dhtmlx/diagram/diagram_4.0/codebase/diagramWithEditor.js',
];

const DefaultEditorAutoplacement = () => {
  const diagram = useRef(null);
  const editor = useRef(null);

  useEffect(() => {
    const readyPromise = fromCDN(LinkCdn);

    readyPromise.then(() => {
      const initDiagram = () => {
        // eslint-disable-next-line no-undef
        diagram.current = new dhx.Diagram('diagram', {
          type: 'default',
          lineGap: 10,
        });

        // eslint-disable-next-line no-undef
        editor.current = new dhx.DiagramEditor('editor', {
          type: 'default',
          autoplacement: {
            mode: 'direct',
          },
        });

        // diagram.current.data.parse(swimlineData);
      };

      const destroyDiagram = () => {
        console.log('-----------destroyDiagram---------');
        diagram.current && diagram.current.destructor();
      };

      initDiagram();

      return () => {
        destroyDiagram();
      };
    });
  }, []);
  return (
    <div className="dhx-container_inner">
      {/* <div className="dhx_sample-widget" id="diagram"></div> */}
      <div className="dhx_sample-widget" id="editor"></div>
    </div>
  );
};

export default DefaultEditorAutoplacement;
