function copiarDatos() {
  const tarjetas = document.querySelectorAll('.valor');
  
  if (tarjetas.length === 0) return;

  const titular = tarjetas[0].innerText.trim();
  const rut = tarjetas[1].innerText.trim();
  const banco = tarjetas[2].innerText.trim();
  const tipoCuenta = tarjetas[3].innerText.trim();
  const nroCuenta = tarjetas[4].innerText.trim();
  const correo = tarjetas[5].innerText.trim();

  const textoACopiar = 
    `Titular: ${titular}\n` +
    `RUT: ${rut}\n` +
    `Banco: ${banco}\n` +
    `Tipo de Cuenta: ${tipoCuenta}\n` +
    `Nro de Cuenta: ${nroCuenta}\n` +
    `Correo: ${correo}`;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(textoACopiar).then(() => {
      mostrarMensaje();
    }).catch(err => {
      fallbackCopiarTexto(textoACopiar);
    });
  } else {
    fallbackCopiarTexto(textoACopiar);
  }
}

function fallbackCopiarTexto(texto) {
  const textarea = document.createElement('textarea');
  textarea.value = texto;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  
  try {
    const success = document.execCommand('copy');
    if (success) {
      mostrarMensaje();
    }
  } catch (err) {
    console.error('Error al copiar', err);
  }
  
  document.body.removeChild(textarea);
}

function mostrarMensaje() {
  const mensaje = document.getElementById('mensaje-flotante');
  if (!mensaje) return;
  mensaje.style.display = 'block';
  setTimeout(() => {
    mensaje.style.display = 'none';
  }, 2500);
}
