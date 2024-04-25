const Frame = ({ img, text, ip }) => {
  const tableProcess = TableProcess({ img, text, ip });
  return `
  <div class="f_container_frame">
  ${tableProcess}
  </div>
  `;
};

export const TableProcess = ({ img, text, ip }) => {
  return `
    <section class="dhx-diagram-demo_network-card">
      <img src="${img}" alt="${text}"></img>
      <span>${text}</span>
      <span>${ip}</span>
    </section>
  `;
};

export default Frame;
