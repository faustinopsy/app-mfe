window.renderMFE2 = (containerId) => {
    const container = document.getElementById(containerId);
    if (container) {
      const element = document.createElement('div');
      element.innerHTML = `
        <h2>Micro Frontend 2</h2>
        <p>Conteúdo do MFE 2.</p>
      `;
      container.appendChild(element);
    }
  };
  