window.renderMFE1 = (containerId) => {
    const container = document.getElementById(containerId);
    if (container) {
      const element = document.createElement('div');
      element.innerHTML = `
        <h2>Micro Frontend 1</h2>
        <p>Conteúdo do MFE 1.</p>
      `;
      container.appendChild(element);
    }
  };
  