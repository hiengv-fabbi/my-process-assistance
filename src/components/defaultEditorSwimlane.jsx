import React, { useState, useEffect } from 'react';
import fromCDN from 'from-cdn';
import Button from './Button';

import { simlaneExport } from '../static/data';

const DefaultEditorSwimlane = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [diagram, setDiagram] = useState(null);
  const [editor, setEditor] = useState(null);

  const defaults = {
    start: {
      fill: '#F35A4F',
      stroke: '#F35A4F',
      fontColor: '#FFFFFF',
      strokeWidth: 2,
    },
    circle: {
      fill: '#F35A4F',
      stroke: '#F35A4F',
      fontColor: '#FFFFFF',
      strokeWidth: 2,
    },
    rectangle: {
      fill: '#FFFFFF',
      stroke: '#F35A4F',
      fontColor: '#4C4C4C',
      strokeWidth: 2,
    },
  };

  useEffect(() => {
    const readyPromise = fromCDN([
      'https://webix.io/dev/dhtmlx/diagram/diagram_4.0/codebase/diagramWithEditor.js',
    ]);

    readyPromise.then(() => {
      const diagramInstance = new dhx.Diagram('diagram', {
        type: 'default',
        defaults: defaults,
      });
      setDiagram(diagramInstance);

      const editorInstance = new dhx.DiagramEditor('editor', {
        type: 'default',
      });
      setEditor(editorInstance);

      editorInstance.events.on('ApplyButton', applyButton);
      editorInstance.events.on('ResetButton', resetButton);

      diagramInstance.data.parse(simlaneExport);
    });

    return () => {
      diagram && diagram.destructor();
    };
  }, []);

  const runEditor = () => {
    setCollapsed(false);
    editor.import(diagram);
  };

  const applyButton = () => {
    setCollapsed(true);
    diagram.data.parse(editor.serialize());
  };

  const resetButton = () => {
    setCollapsed(true);
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

export default DefaultEditorSwimlane;
