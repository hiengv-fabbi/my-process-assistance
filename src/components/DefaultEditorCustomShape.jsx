import React, { useState, useEffect, useRef } from 'react';
import fromCDN from 'from-cdn';
// import Button from './Button';

import { networkData, simlaneExport, customNetworkData } from '../static/data';

const LinkCdn = [
  'https://webix.io/dev/dhtmlx/diagram/diagram_5.0/codebase/diagramWithEditor.css',
  'https://webix.io/dev/dhtmlx/diagram/diagram_5.0/codebase/diagramWithEditor.js',
];

const path = './common/img/network';
const defaults = {
  width: 160,
  height: 160,
  img: `${path}/desktop.svg`,
  text: 'Network Card Sample',
  ip: '138.68.41.78',
  preview: {
    scale: 0.8,
  },
};

const collapseGroup = {
  type: '$group',
  width: 200,
  height: 200,
  header: {
    text: 'Collapse group',
    closable: true,
    fontColor: '#FFF',
    iconColor: '#FFF',
    fill: '#333',
  },
};
const regularGroup = {
  type: '$group',
  width: 200,
  height: 200,
  header: {
    text: 'Regular group',
    closable: false,
  },
};

const coreShape = { type: 'networkCard', img: `${path}/core.svg` };
const server = { type: 'networkCard', img: `${path}/server.svg` };
const cloud = { type: 'networkCard', img: `${path}/cloud.svg` };
const user = { type: 'networkCard', img: `${path}/fieldworker.svg` };
const desktop = { type: 'networkCard', img: `${path}/desktop.svg` };

const shapeSections = {
  'Network Shapes': [coreShape],
  // Groups: [collapseGroup, regularGroup],
};

const URL_EXPORT = 'https://export.dhtmlx.com';

const templateNetworkCard = ({ img, text, ip }) => {
  return `
    <section class="dhx-diagram-demo_network-card">
      <img src="${img}" alt="${text}"></img>
      <span>${text}</span>
      <span>${ip}</span>
    </section>
  `;
};

const ControlBtn = ({ onClick, name, disabled }) => {
  return (
    <div>
      <button
        className="dhx_sample-btn dhx_sample-btn--flat"
        onClick={onClick}
        disabled={!!disabled}
      >
        {name}
      </button>
    </div>
  );
};

const DefaultEditorCustomShape = () => {
  const [collapsed, setCollapsed] = useState(true);
  const diagram = useRef(null);
  const editor = useRef(null);
  console.log('-----------render---------');

  useEffect(() => {
    const readyPromise = fromCDN(LinkCdn);

    readyPromise.then(() => {
      const initDiagram = () => {
        // eslint-disable-next-line no-undef
        diagram.current = new dhx.Diagram('diagram', {
          type: 'default',
          lineGap: 10,
        });

        // right side
        // eslint-disable-next-line no-undef
        editor.current = new dhx.DiagramEditor('editor', {
          controls: { autoLayout: false },
          shapeSections,
          shapeBarWidth: 320,
          lineGap: 10,
          // type: 'default',
          // autoplacement: {
          //   mode: 'direct',
          // },
        });
        // left side
        editor.current.diagram.addShape('networkCard', {
          template: templateNetworkCard,
          defaults: defaults,
          properties: [
            { type: 'arrange' },
            { type: 'img', label: 'Photo' },
            { type: 'text' },
            { type: 'text', label: 'IP', property: 'ip' },
          ],
        });

        diagram.current.addShape('networkCard', {
          template: templateNetworkCard,
          // defaults: defaults,
        });

        editor.current.events.on('ApplyButton', applyButton);
        editor.current.events.on('ResetButton', resetButton);
        diagram.current.data.parse(customNetworkData);
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
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const runEditor = () => {
    if (!!!editor.current) return;
    editor.current.import(diagram.current);
    setCollapsed(false);
  };

  const applyButton = () => {
    setCollapsed(true);
    diagram.current.data.parse(editor.current.serialize());
  };

  const resetButton = () => {
    setCollapsed(true);
  };

  function exportFile(file) {
    diagram.current.export[file]({
      url: `${URL_EXPORT}/chart/${file}/8.0`,
      theme: 'dark',
    });
  }

  const handleExportPdf = () => {
    exportFile('pdf');
  };

  const handleExportPng = () => {
    exportFile('png');
  };

  return (
    <div
      className={
        collapsed
          ? 'dhx-container_inner dhx_sample-container__without-editor'
          : 'dhx-container_inner dhx_sample-container__with-editor'
      }
    >
      <div className="dhx_wrap_btn">
        {collapsed && <ControlBtn name="Edit Mode" onClick={runEditor} />}
        {collapsed && (
          <ControlBtn
            name="EXPORT PNG"
            onClick={handleExportPng}
            disabled={true}
          />
        )}
        {collapsed && (
          <ControlBtn
            name="EXPORT PDF"
            onClick={handleExportPdf}
            disabled={true}
          />
        )}
      </div>
      <div
        className="dhx_sample-widget"
        id="diagram"
        style={collapsed ? {} : { display: 'none' }}
      ></div>
      <div
        className="dhx_sample-widget"
        id="editor"
        style={collapsed ? { display: 'none' } : {}}
      ></div>
    </div>
  );
};

export default DefaultEditorCustomShape;
