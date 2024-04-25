import React, { useState, useEffect, useRef } from 'react';

import { customNetworkData, MY_LOCALE } from '../../static/data';
import Frame, { TableProcess } from './TableProcess';

const path = './common/img/network';

const defaults4Editor = {
  width: 150,
  height: 150,
  img: `${path}/desktop.svg`,
  text: 'Sample',
  ip: '138.68.41.78',
  preview: {
    scale: 0.7,
  },
};

const defaults4Diagram = {
  width: 900,
  height: 800,
  img: `${path}/desktop.svg`,
  text: 'Sample',
  ip: '138.68.41.78',
  preview: {
    scale: 0.7,
  },
};

const coreShape = { type: 'networkCard', img: `${path}/core.svg` };

const shapeSections = {
  'Default shapes': [
    { text: 'circle', type: 'circle' },
    { text: 'rectangle', type: 'rectangle' },
    { text: 'triangle', type: 'triangle' },
  ],
  'Blueprint Shapes': [coreShape],
};

const URL_EXPORT = 'https://export.dhtmlx.com';

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
  // const [hideLeftPane, setHideLeftpane] = useState(false);

  const diagram = useRef(null);
  const editor = useRef(null);

  useEffect(() => {
    const initDiagram = () => {
      if (!!!window.dhx) return;
      // set locale
      // eslint-disable-next-line no-undef
      dhx.i18n.setLocale('diagram', MY_LOCALE);

      // eslint-disable-next-line no-undef
      diagram.current = new dhx.Diagram('diagram', {
        type: 'default',
        lineGap: 10,
      });

      // right side
      // eslint-disable-next-line no-undef
      editor.current = new dhx.DiagramEditor('editor', {
        controls: {
          autoLayout: false,
          editManager: true,
          gridStep: false,
        },
        shapeSections,
        shapeBarWidth: 250,
        lineGap: 10,
        scale: 0.9,
      });
      // left side
      editor.current.diagram.addShape('networkCard', {
        template: TableProcess,
        defaults: defaults4Editor,
        properties: [
          { type: 'arrange' },
          { type: 'img', label: 'Photo' },
          { type: 'text' },
          { type: 'text', label: 'IP', property: 'ip' },
        ],
      });

      editor.current.events.on('ApplyButton', applyButton);
      editor.current.events.on('ResetButton', resetButton);
      editor.current.events.on('visibility', editManager);

      editor.current.events.on('beforeItemMove', (event, id, coordinates) => {
        console.log(`
            Item ${id} is position: 
                x: ${coordinates.x} 
                y: ${coordinates.y}
        `);
        return false;
      });

      diagram.current.addShape('networkCard', {
        template: TableProcess,
        defaults: defaults4Editor,
        // defaults: defaults4Diagram,
        // eventHandlers: {
        //   onclick: {
        //     dhx_diagram_line: () => {},
        //   },
        // },
      });
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
    // Empty dependency array ensures this effect runs only once on component mount
  }, []);

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

  const editManager = (e) => {
    console.log('editManager!: ', e);
    return;
  };

  function exportFile(file) {
    diagram.current.export[file]({
      url: `${URL_EXPORT}/chart/${file}/8.0`,
      theme: 'dark',
    });
  }

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
            onClick={() => exportFile('png')}
            disabled={true}
          />
        )}
        {collapsed && (
          <ControlBtn
            name="EXPORT PDF"
            onClick={() => exportFile('pdf')}
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
