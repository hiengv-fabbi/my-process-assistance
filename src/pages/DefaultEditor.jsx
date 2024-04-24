import React, { useState } from 'react';
import Button from '../components/Button';

import DefaultEditorAutoplacement from '../components/defaultEditorAutoplacement';
import DefaultEditorCustomShape from '../components/DefaultEditorCustomShape';
// import DefaultEditorSwimlane from '../components/defaultEditorSwimlane';
// import DefaultEditorGroup from '../components/defaultEditorGroup';


const DefaultEditorStories = () => {
  const [activeEditor, setActiveEditor] = useState(1);
  const listBtn = [
    { id: 1, name: 'Custom Shape' },
    { id: 2, name: 'Default' },
    { id: 3, name: 'Editor groups' },
    { id: 4, name: 'Editor swinlane' },
  ];
  const changeActivity = (id) => {
    console.log('changeActivity: ', id);
    setActiveEditor(id);
  };
  return (
    <>
      <section className="dhx-container">
        <div className="dhx-container_header">
          <div className="list_btn">
            {listBtn.map((item) => (
              <Button
                key={item.id}
                name={item.name}
                onClick={() => changeActivity(item.id)}
              />
            ))}
          </div>
        </div>
        {activeEditor === 2 && <DefaultEditorAutoplacement />}
        {activeEditor === 1 && <DefaultEditorCustomShape />}
        {/* {activeEditor === 3 && <DefaultEditorGroup />} */}
        {/* {activeEditor === 4 && <DefaultEditorSwimlane />} */}
      </section>
    </>
  );
};

export default DefaultEditorStories;
