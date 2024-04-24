import React, { useState, useEffect, useRef } from 'react';
import fromCDN from 'from-cdn';
import Button from './Button';
// import './DefaultEditorGroup.css';

import { groupData } from '../static/data';

const path = './common/img/it/';
const extension = '.png';

const defaults = {
  width: 115,
  height: 120,
  text: 'description',
};

const it_01 = {
  type: 'it',
  img: path + 'it_01' + extension,
  ...defaults,
};
const it_02 = {
  type: 'it',
  img: path + 'it_02' + extension,
  ...defaults,
};
const it_03 = {
  type: 'it',
  img: path + 'it_03' + extension,
  ...defaults,
};
const it_04 = {
  type: 'it',
  img: path + 'it_04' + extension,
  ...defaults,
};
const it_05 = {
  type: 'it',
  img: path + 'it_05' + extension,
  ...defaults,
};
const it_06 = {
  type: 'it',
  img: path + 'it_06' + extension,
  ...defaults,
};
const it_07 = {
  type: 'it',
  img: path + 'it_07' + extension,
  ...defaults,
};
const it_08 = {
  type: 'it',
  img: path + 'it_08' + extension,
  ...defaults,
};
const it_09 = {
  type: 'it',
  img: path + 'it_09' + extension,
  ...defaults,
};
const it_10 = {
  type: 'it',
  img: path + 'it_10' + extension,
  ...defaults,
};
const it_11 = {
  type: 'it',
  img: path + 'it_11' + extension,
  ...defaults,
};
const it_12 = {
  type: 'it',
  img: path + 'it_12' + extension,
  ...defaults,
};
const it_13 = {
  type: 'it',
  img: path + 'it_13' + extension,
  ...defaults,
};
const it_14 = {
  type: 'it',
  img: path + 'it_14' + extension,
  ...defaults,
};

const sample_data = [
  it_01,
  it_02,
  it_03,
  it_04,
  it_05,
  it_06,
  it_07,
  it_08,
  it_09,
  it_10,
  it_11,
  it_12,
  it_13,
  it_14,
];

const generalGroup = {
  type: '$group',
  width: 390,
  height: 350,
  header: {
    text: 'General group',
    closable: true,
    fontColor: '#FFF',
    iconColor: '#FFF',
    fill: '#333',
  },
};
const regularGroup = {
  type: '$group',
  width: 390,
  height: 350,
  header: {
    text: 'Regular group',
    closable: true,
  },
};

const DefaultEditorGroup = () => {
  const [collapsed, setCollapsed] = useState(true);

  const diagram = useRef(null);
  const editor = useRef(null);

  useEffect(() => {
    const ready = fromCDN([
      'https://webix.io/dev/dhtmlx/diagram/diagram_4.0/codebase/diagramWithEditor.js',
    ]);
    ready.then(() => {
      const initDiagram = () => {
        if (!!!dhx) return;
        diagram.current = new dhx.Diagram('diagram', {
          type: 'default',
        });

        editor.current = new dhx.DiagramEditor('editor', {
          type: 'default',
          shapeBarWidth: 330,
          scalePreview: 0.7,
          shapeSections: {
            'Architecture items': sample_data,
            Groups: [generalGroup, regularGroup],
          },
        });

        diagram.current.addShape('it', {
          template: template,
          defaults: defaults,
        });

        editor.current.diagram.addShape('it', {
          template: template,
          defaults: defaults,
          properties: [{ type: 'arrange' }, { type: 'text' }],
        });

        editor.current.events.on('ApplyButton', applyButton);
        editor.current.events.on('ResetButton', resetButton);

        diagram.current.data.parse(groupData);
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
    setCollapsed(false);
    editor.current.import(diagram.current);
  };

  const applyButton = () => {
    setCollapsed(true);
    diagram.current.data.parse(editor.current.serialize());
  };

  const resetButton = () => {
    setCollapsed(true);
  };

  const template = ({ img, text }) => {
    return `
      <div class="dhx-diagram-demo_group">
        <div class="dhx-diagram-demo_group__image" style="background-image:url(${img});"></div>
        <div class="dhx-diagram-demo_group__text">${text}</div>
      </div>
    `;
  };

  const isCollapsed = collapsed;
  const css = isCollapsed
    ? 'dhx-container_inner dhx_sample-container__without-editor'
    : 'dhx-container_inner dhx_sample-container__with-editor';

  return (
    <div className={css}>
      {isCollapsed && <Button name="Edit" onClick={runEditor} />}
      <div
        className="dhx_sample-widget"
        id="diagram"
        style={isCollapsed ? {} : { display: 'none' }}
      ></div>
      <div
        className="dhx_sample-widget"
        id="editor"
        style={isCollapsed ? { display: 'none' } : {}}
      ></div>
    </div>
  );
};

export default DefaultEditorGroup;
