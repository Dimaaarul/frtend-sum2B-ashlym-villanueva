const form = document.querySelector('.registration-form');
const especieSelect = document.getElementById('especie');
const especieOtroLabel = document.getElementById('especie-otro-label');
const microchipCheckbox = document.getElementById('microchip');
const chipNumeroLabel = document.getElementById('chip-numero-label');
const chipNumeroInput = document.getElementById('chip-numero');
const charCounters = document.querySelectorAll('.char-counter');

const fieldMap = {
  nombre: document.getElementById('nombre'),
  fechaNacimiento: document.getElementById('fecha-nacimiento'),
  dni: document.getElementById('dni'),
  email: document.getElementById('email'),
  emailConfirm: document.getElementById('email-confirm'),
  password: document.getElementById('password'),
  passwordConfirm: document.getElementById('password-confirm'),
  telefono: document.getElementById('telefono'),
  direccion: document.getElementById('direccion'),
  localidad: document.getElementById('localidad'),
  provincia: document.getElementById('provincia'),
  mascotaNombre: document.getElementById('mascota-nombre'),
  especie: document.getElementById('especie'),
  especieOtro: document.getElementById('especie-otro'),
  mascotaRaza: document.getElementById('mascota-raza'),
  mascotaSexo: document.getElementsByName('mascota-sexo'),
  mascotaFecha: document.getElementById('mascota-fecha'),
  chipCheckbox: document.getElementById('microchip'),
  chipNumero: document.getElementById('chip-numero'),
  terminos: document.getElementById('terminos'),
  privacidad: document.getElementById('privacidad')
};

// Sección C campos
fieldMap.servicios = document.getElementsByName('servicios');
fieldMap.turno = document.getElementsByName('turno');
fieldMap.veterinario = document.getElementById('veterinario');
fieldMap.frecuencia = document.getElementById('frecuencia');
fieldMap.conocio = document.getElementById('conocio');

const regex = {
  nombre: /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+$/,
  dni: /^\d{7,8}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
  telefono: /^[\d+\-\s]+$/,
  soloLetrasEspacios: /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+$/,
  microchip: /^\d{9,15}$/
};

function createErrorMessage(text) {
  const span = document.createElement('span');
  span.className = 'input-error';
  span.textContent = text;
  return span;
}

function removeErrorMessage(element) {
  const existing = element.parentElement.querySelector('.input-error');
  if (existing) {
    existing.remove();
  }
}

function showError(element, message) {
  const target = element instanceof HTMLFieldSetElement ? element : element;
  const parent = target.parentElement;
  if (!parent) return;

  removeErrorMessage(target);
  const messageNode = createErrorMessage(message);

  if (target instanceof HTMLFieldSetElement) {
    parent.insertBefore(messageNode, target.nextSibling);
    target.classList.add('campo-error');
    target.classList.remove('campo-ok');
  } else {
    parent.insertBefore(messageNode, target.nextSibling);
    target.classList.add('campo-error');
    target.classList.remove('campo-ok');
  }
}

function showSuccess(element) {
  const parent = element.parentElement;
  if (!parent) return;
  removeErrorMessage(element);
  element.classList.remove('campo-error');
  element.classList.add('campo-ok');
}

function isAtLeastYearsOld(dateString, years) {
  if (!dateString) return false;
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return false;
  const today = new Date();
  const threshold = new Date(today.getFullYear() - years, today.getMonth(), today.getDate());
  return date <= threshold;
}

function isNotFuture(dateString) {
  if (!dateString) return false;
  const date = new Date(dateString);
  return date <= new Date();
}

function validateNombre() {
  const valor = fieldMap.nombre.value.trim();
  if (!valor) {
    showError(fieldMap.nombre, 'El nombre completo no puede estar vacío.');
    return false;
  }
  if (valor.length < 5 || valor.length > 80) {
    showError(fieldMap.nombre, 'Debe tener entre 5 y 80 caracteres.');
    return false;
  }
  if (!regex.nombre.test(valor)) {
    showError(fieldMap.nombre, 'Solo puede contener letras y espacios.');
    return false;
  }
  showSuccess(fieldMap.nombre);
  return true;
}

function validateFechaNacimiento() {
  const valor = fieldMap.fechaNacimiento.value;
  if (!valor) {
    showError(fieldMap.fechaNacimiento, 'La fecha de nacimiento es obligatoria.');
    return false;
  }
  if (!isAtLeastYearsOld(valor, 18)) {
    showError(fieldMap.fechaNacimiento, 'Debes tener al menos 18 años.');
    return false;
  }
  showSuccess(fieldMap.fechaNacimiento);
  return true;
}

function validateDNI() {
  const valor = fieldMap.dni.value.trim();
  if (!valor) {
    showError(fieldMap.dni, 'El DNI no puede estar vacío.');
    return false;
  }
  if (!regex.dni.test(valor)) {
    showError(fieldMap.dni, 'Debe contener solo números y tener 7 u 8 dígitos.');
    return false;
  }
  showSuccess(fieldMap.dni);
  return true;
}

function validateEmail() {
  const valor = fieldMap.email.value.trim();
  if (!valor) {
    showError(fieldMap.email, 'El correo electrónico es obligatorio.');
    return false;
  }
  if (!regex.email.test(valor)) {
    showError(fieldMap.email, 'Ingresa un correo electrónico válido.');
    return false;
  }
  showSuccess(fieldMap.email);
  return true;
}

function validateEmailConfirm() {
  const valor = fieldMap.emailConfirm.value.trim();
  if (!valor) {
    showError(fieldMap.emailConfirm, 'Confirma tu correo electrónico.');
    return false;
  }
  if (valor !== fieldMap.email.value.trim()) {
    showError(fieldMap.emailConfirm, 'Los correos electrónicos no coinciden.');
    return false;
  }
  showSuccess(fieldMap.emailConfirm);
  return true;
}

function validatePassword() {
  const valor = fieldMap.password.value;
  if (!valor) {
    showError(fieldMap.password, 'La contraseña es obligatoria.');
    return false;
  }
  if (!regex.password.test(valor)) {
    showError(fieldMap.password, 'Debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial.');
    return false;
  }
  showSuccess(fieldMap.password);
  return true;
}

function validatePasswordConfirm() {
  const valor = fieldMap.passwordConfirm.value;
  if (!valor) {
    showError(fieldMap.passwordConfirm, 'Confirma tu contraseña.');
    return false;
  }
  if (valor !== fieldMap.password.value) {
    showError(fieldMap.passwordConfirm, 'Las contraseñas no coinciden.');
    return false;
  }
  showSuccess(fieldMap.passwordConfirm);
  return true;
}

function validateTelefono() {
  const valor = fieldMap.telefono.value.trim();
  if (!valor) {
    showError(fieldMap.telefono, 'El teléfono es obligatorio.');
    return false;
  }
  if (!regex.telefono.test(valor)) {
    showError(fieldMap.telefono, 'Solo se permiten dígitos, espacios, guiones y +.');
    return false;
  }
  const digitsCount = valor.replace(/\D/g, '').length;
  if (digitsCount < 8) {
    showError(fieldMap.telefono, 'Debe contener al menos 8 dígitos numéricos.');
    return false;
  }
  showSuccess(fieldMap.telefono);
  return true;
}

function validateDireccion() {
  const valor = fieldMap.direccion.value.trim();
  if (!valor) {
    showError(fieldMap.direccion, 'La dirección no puede estar vacía.');
    return false;
  }
  if (valor.length < 3) {
    showError(fieldMap.direccion, 'Debe tener al menos 3 caracteres.');
    return false;
  }
  showSuccess(fieldMap.direccion);
  return true;
}

function validateLocalidad() {
  const valor = fieldMap.localidad.value.trim();
  if (!valor) {
    showError(fieldMap.localidad, 'La localidad no puede estar vacía.');
    return false;
  }
  if (valor.length < 3) {
    showError(fieldMap.localidad, 'Debe tener al menos 3 caracteres.');
    return false;
  }
  showSuccess(fieldMap.localidad);
  return true;
}

function validateProvincia() {
  const valor = fieldMap.provincia.value;
  if (!valor) {
    showError(fieldMap.provincia, 'Selecciona una provincia válida.');
    return false;
  }
  showSuccess(fieldMap.provincia);
  return true;
}

function validateMascotaNombre() {
  const valor = fieldMap.mascotaNombre.value.trim();
  if (!valor) {
    showError(fieldMap.mascotaNombre, 'El nombre de la mascota no puede estar vacío.');
    return false;
  }
  if (valor.length < 2) {
    showError(fieldMap.mascotaNombre, 'Debe tener al menos 2 caracteres.');
    return false;
  }
  if (!regex.soloLetrasEspacios.test(valor)) {
    showError(fieldMap.mascotaNombre, 'Solo puede contener letras y espacios.');
    return false;
  }
  showSuccess(fieldMap.mascotaNombre);
  return true;
}

function validateEspecie() {
  const valor = especieSelect.value;
  if (!valor) {
    showError(especieSelect, 'Selecciona una especie válida.');
    return false;
  }
  showSuccess(especieSelect);
  if (valor === 'Otro') {
    return validateEspecieOtro();
  }
  if (fieldMap.especieOtro.value.trim()) {
    showSuccess(fieldMap.especieOtro);
  }
  return true;
}

function validateEspecieOtro() {
  const valor = fieldMap.especieOtro.value.trim();
  if (!valor) {
    showError(fieldMap.especieOtro, 'Especifica la especie si elegiste "Otro".');
    return false;
  }
  showSuccess(fieldMap.especieOtro);
  return true;
}

function validateMascotaRaza() {
  const valor = fieldMap.mascotaRaza.value.trim();
  if (!valor) {
    showError(fieldMap.mascotaRaza, 'La raza no puede estar vacía.');
    return false;
  }
  if (valor.length < 2) {
    showError(fieldMap.mascotaRaza, 'Debe tener al menos 2 caracteres.');
    return false;
  }
  showSuccess(fieldMap.mascotaRaza);
  return true;
}

function validateMascotaSexo() {
  const sexoGroup = Array.from(fieldMap.mascotaSexo);
  const selected = sexoGroup.some(input => input.checked);
  const fieldsetElement = sexoGroup[0].closest('fieldset');
  if (!selected) {
    showError(fieldsetElement || fieldMap.mascotaSexo[0], 'Selecciona el sexo de la mascota.');
    return false;
  }
  if (fieldsetElement) {
    fieldsetElement.classList.remove('campo-error');
    fieldsetElement.classList.add('campo-ok');
    const existing = fieldsetElement.parentElement.querySelector('.input-error');
    if (existing) existing.remove();
  }
  return true;
}

function validateMascotaFecha() {
  const valor = fieldMap.mascotaFecha.value;
  if (!valor) {
    showError(fieldMap.mascotaFecha, 'La fecha de nacimiento de la mascota es obligatoria.');
    return false;
  }
  if (!isNotFuture(valor)) {
    showError(fieldMap.mascotaFecha, 'La fecha de nacimiento no puede ser futura.');
    return false;
  }
  if (!isAtLeastYearsOld(valor, 0)) {
    showError(fieldMap.mascotaFecha, 'Fecha inválida.');
    return false;
  }
  const today = new Date();
  const birthDate = new Date(valor);
  const age = today.getFullYear() - birthDate.getFullYear() - (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate()) ? 1 : 0);
  if (age > 30) {
    showError(fieldMap.mascotaFecha, 'La mascota no puede tener más de 30 años.');
    return false;
  }
  showSuccess(fieldMap.mascotaFecha);
  return true;
}

function validateChipNumero() {
  if (!microchipCheckbox.checked) {
    removeErrorMessage(chipNumeroInput);
    chipNumeroInput.classList.remove('campo-error', 'campo-ok');
    return true;
  }
  const valor = chipNumeroInput.value.trim();
  if (!valor) {
    showError(chipNumeroInput, 'Ingresa el número de microchip.');
    return false;
  }
  if (!regex.microchip.test(valor)) {
    showError(chipNumeroInput, 'El número debe tener entre 9 y 15 dígitos.');
    return false;
  }
  showSuccess(chipNumeroInput);
  return true;
}

// Sección C — Validaciones (Turno, Veterinario, Frecuencia, Cómo nos conoció, Servicios)
function validateServicios() {
  const servicios = Array.from(fieldMap.servicios || []);
  if (servicios.length === 0) return true; // no hay inputs, omitir
  const checked = servicios.some(cb => cb.checked);
  const fieldset = servicios[0] ? servicios[0].closest('fieldset') : null;
  if (!checked) {
    if (fieldset) showError(fieldset, 'Selecciona al menos un servicio de interés.');
    return false;
  }
  if (fieldset) {
    fieldset.classList.remove('campo-error');
    fieldset.classList.add('campo-ok');
    const existing = fieldset.parentElement.querySelector('.input-error');
    if (existing) existing.remove();
  }
  return true;
}

function validateTurno() {
  const turnoGroup = Array.from(fieldMap.turno || []);
  if (turnoGroup.length === 0) return true;
  const selected = turnoGroup.some(r => r.checked);
  const fieldset = turnoGroup[0].closest('fieldset');
  if (!selected) {
    showError(fieldset || turnoGroup[0], 'Selecciona un turno preferido.');
    return false;
  }
  if (fieldset) {
    fieldset.classList.remove('campo-error');
    fieldset.classList.add('campo-ok');
    const existing = fieldset.parentElement.querySelector('.input-error');
    if (existing) existing.remove();
  }
  return true;
}

function validateVeterinario() {
  const valor = fieldMap.veterinario.value;
  if (!valor) {
    showError(fieldMap.veterinario, 'Selecciona un veterinario o "Sin preferencia".');
    return false;
  }
  showSuccess(fieldMap.veterinario);
  return true;
}

function validateFrecuencia() {
  const valor = fieldMap.frecuencia.value;
  if (!valor) {
    showError(fieldMap.frecuencia, 'Selecciona la frecuencia estimada de visitas.');
    return false;
  }
  showSuccess(fieldMap.frecuencia);
  return true;
}

function validateConocio() {
  const valor = fieldMap.conocio.value;
  if (!valor) {
    showError(fieldMap.conocio, 'Indica cómo nos conociste.');
    return false;
  }
  showSuccess(fieldMap.conocio);
  return true;
}

function validateTerminos() {
  if (!fieldMap.terminos.checked) {
    showError(fieldMap.terminos.closest('label') || fieldMap.terminos, 'Debes aceptar los Términos y Condiciones.');
    return false;
  }
  showSuccess(fieldMap.terminos);
  return true;
}

function validatePrivacidad() {
  if (!fieldMap.privacidad.checked) {
    showError(fieldMap.privacidad.closest('label') || fieldMap.privacidad, 'Debes aceptar la Política de Privacidad.');
    return false;
  }
  showSuccess(fieldMap.privacidad);
  return true;
}

function resetValidationState() {
  const inputs = form.querySelectorAll('input, select, textarea, fieldset');
  inputs.forEach(element => {
    element.classList.remove('campo-error', 'campo-ok');
    if (element instanceof HTMLElement) {
      const error = element.parentElement?.querySelector('.input-error');
      if (error) error.remove();
    }
  });
}

function validateAll() {
  resetValidationState();
  const validations = [
    validateNombre(),
    validateFechaNacimiento(),
    validateDNI(),
    validateEmail(),
    validateEmailConfirm(),
    validatePassword(),
    validatePasswordConfirm(),
    validateTelefono(),
    validateDireccion(),
    validateLocalidad(),
    validateProvincia(),
    validateMascotaNombre(),
    validateEspecie(),
    validateMascotaRaza(),
    validateMascotaSexo(),
    validateMascotaFecha(),
    validateChipNumero(),
    validateServicios(),
    validateTurno(),
    validateVeterinario(),
    validateFrecuencia(),
    validateConocio(),
    validateTerminos(),
    validatePrivacidad()
  ];
  return validations.every(Boolean);
}

function showConfirmationScreen() {
  // Ocultar el formulario y mostrar una sección de confirmación con detalles
  form.style.display = 'none';
  const owner = fieldMap.nombre.value.trim();
  const pet = fieldMap.mascotaNombre.value.trim();
  const regNum = Math.floor(100000 + Math.random() * 900000);
  const servicios = Array.from(document.getElementsByName('servicios'))
    .filter(cb => cb.checked)
    .map(cb => cb.value);
  const serviciosText = servicios.length ? servicios.join(', ') : 'Ninguno seleccionado';

  const section = document.createElement('section');
  section.className = 'confirmation-section';
  section.innerHTML = `
    <div class="confirmation-card">
      <h2>Registro exitoso</h2>
      <p>¡Gracias, <strong>${escapeHtml(owner)}</strong>! El registro de <strong>${escapeHtml(pet)}</strong> se ha completado.</p>
      <p><strong>Número de registro:</strong> ${regNum}</p>
      <p><strong>Servicios seleccionados:</strong> ${escapeHtml(serviciosText)}</p>
      <div class="confirmation-actions">
        <a href="index.html" class="btn btn-secondary">Volver al inicio</a>
        <button type="button" id="registrar-otra" class="btn btn-primary">Registrar otra mascota</button>
      </div>
    </div>
  `;
  form.parentElement.insertBefore(section, form.nextSibling);

  document.getElementById('registrar-otra').addEventListener('click', () => {
    section.remove();
    form.style.display = '';
    form.reset();
    resetValidationState();
    especieOtroLabel.classList.add('hidden');
    chipNumeroLabel.classList.add('hidden');
    charCounters.forEach(counter => counter.textContent = `0/${counter.dataset.max}`);
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function showFormErrorSummary(count) {
  let summary = form.querySelector('.form-error-summary');
  if (!summary) {
    summary = document.createElement('div');
    summary.className = 'form-error-summary';
    form.insertBefore(summary, form.firstChild);
  }
  summary.textContent = `Se encontraron ${count} error(es). Por favor, corrígelos antes de enviar.`;
}

function resetFormErrorSummary() {
  const summary = form.querySelector('.form-error-summary');
  if (summary) summary.remove();
}

function attachFieldEvents() {
  fieldMap.nombre.addEventListener('input', validateNombre);
  fieldMap.fechaNacimiento.addEventListener('change', validateFechaNacimiento);
  fieldMap.dni.addEventListener('input', validateDNI);
  fieldMap.email.addEventListener('input', validateEmail);
  fieldMap.emailConfirm.addEventListener('input', validateEmailConfirm);
  fieldMap.password.addEventListener('input', validatePassword);
  fieldMap.passwordConfirm.addEventListener('input', validatePasswordConfirm);
  fieldMap.telefono.addEventListener('input', validateTelefono);
  fieldMap.direccion.addEventListener('input', validateDireccion);
  fieldMap.localidad.addEventListener('input', validateLocalidad);
  fieldMap.provincia.addEventListener('change', validateProvincia);
  fieldMap.mascotaNombre.addEventListener('input', validateMascotaNombre);
  especieSelect.addEventListener('change', () => {
    const show = especieSelect.value === 'Otro';
    especieOtroLabel.classList.toggle('hidden', !show);
    validateEspecie();
  });
  fieldMap.especieOtro.addEventListener('input', validateEspecieOtro);
  fieldMap.mascotaRaza.addEventListener('input', validateMascotaRaza);
  fieldMap.mascotaSexo.forEach(input => input.addEventListener('change', validateMascotaSexo));
  fieldMap.mascotaFecha.addEventListener('change', validateMascotaFecha);
  microchipCheckbox.addEventListener('change', () => {
    chipNumeroLabel.classList.toggle('hidden', !microchipCheckbox.checked);
    validateChipNumero();
  });
  chipNumeroInput.addEventListener('input', validateChipNumero);
  // Sección C listeners
  const servicios = Array.from(fieldMap.servicios || []);
  servicios.forEach(cb => cb.addEventListener('change', validateServicios));
  const turnoGroup = Array.from(fieldMap.turno || []);
  turnoGroup.forEach(r => r.addEventListener('change', validateTurno));
  fieldMap.veterinario.addEventListener('change', validateVeterinario);
  fieldMap.frecuencia.addEventListener('change', validateFrecuencia);
  fieldMap.conocio.addEventListener('change', validateConocio);
  fieldMap.terminos.addEventListener('change', validateTerminos);
  fieldMap.privacidad.addEventListener('change', validatePrivacidad);

  charCounters.forEach(counter => {
    const textarea = counter.parentElement.querySelector('textarea');
    if (!textarea) return;
    textarea.addEventListener('input', () => {
      const len = textarea.value.length;
      const max = +counter.dataset.max;
      counter.textContent = `${len}/${max}`;
      const pct = (len / max) * 100;
      counter.classList.remove('counter-warning', 'counter-max');
      if (pct >= 100) {
        counter.classList.add('counter-max');
      } else if (pct >= 80) {
        counter.classList.add('counter-warning');
      }
    });
  });
}

form.addEventListener('submit', event => {
  event.preventDefault();
  resetFormErrorSummary();
  const isValid = validateAll();
  if (isValid) {
    showConfirmationScreen();
  } else {
    // mostrar resumen con la cantidad de errores
    const errors = form.querySelectorAll('.input-error');
    const count = errors.length;
    showFormErrorSummary(count);
    // scroll al primer campo con error
    const firstInvalid = form.querySelector('.campo-error');
    if (firstInvalid) {
      firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // intentar enfocar un input dentro del field
      const focusable = firstInvalid.querySelector ? firstInvalid.querySelector('input,select,textarea,button') : null;
      (focusable || firstInvalid).focus?.();
    }
  }
});

attachFieldEvents();
