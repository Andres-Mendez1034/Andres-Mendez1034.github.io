import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import "../styles/register.css";

// Validación con Yup
const schema = yup.object().shape({
  nombre: yup
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .required('Este campo es obligatorio'),
  email: yup
    .string()
    .email('Correo inválido')
    .required('Este campo es obligatorio'),
  password: yup
    .string()
    .required('Este campo es obligatorio')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
    .matches(/[a-z]/, 'Debe contener al menos una letra minúscula')
    .matches(/\d/, 'Debe contener al menos un número')
    .matches(/[@$!%*?&.,]/, 'Debe contener al menos un carácter especial (@$!%*?&.,)'),
  siglas: yup
    .string()
    .matches(/^[A-Za-z]{2,5}$/, 'Las siglas deben tener entre 2 y 5 letras')
    .required('Este campo es obligatorio'),
});

const CrearCuenta = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [mostrarTerminos, setMostrarTerminos] = useState(false);

  const onSubmit = (data) => {
    if (aceptaTerminos) {
      console.log('Datos enviados:', data);
      alert('✅ Cuenta creada con éxito.');
    }
  };

  const isFormValid =
    Object.keys(errors).length === 0 &&
    watch('password')?.length >= 8 &&
    aceptaTerminos;

  return (
    <div id="crearcuenta" className="crearcuenta-container">
      <h1 className="crearcuenta-title">Crear Cuenta</h1>
      <form className="crearcuenta-form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="nombre">Nombre completo</label>
        <input
          type="text"
          id="nombre"
          {...register('nombre')}
          placeholder="Ingresa tu nombre"
        />
        {errors.nombre && <span className="error">{errors.nombre.message}</span>}

        <label htmlFor="email">Correo electrónico</label>
        <input
          type="email"
          id="email"
          {...register('email')}
          placeholder="ejemplo@correo.com"
        />
        {errors.email && <span className="error">{errors.email.message}</span>}

        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          {...register('password')}
          placeholder="Crea una contraseña segura"
        />
        {errors.password && <span className="error">{errors.password.message}</span>}

        <label htmlFor="siglas">Siglas anónimas</label>
        <input
          type="text"
          id="siglas"
          {...register('siglas')}
          placeholder="Ej: ABC"
        />
        {errors.siglas && <span className="error">{errors.siglas.message}</span>}

        <button
          type="button"
          className="ver-terminos-btn"
          onClick={() => setMostrarTerminos(!mostrarTerminos)}
        >
          Términos y Condiciones
        </button>

        <div className="terminos-checkbox">
          <input
            type="checkbox"
            id="aceptaTerminos"
            checked={aceptaTerminos}
            onChange={(e) => setAceptaTerminos(e.target.checked)}
          />
          <label htmlFor="aceptaTerminos">
            Acepto los términos y condiciones
          </label>
        </div>

        {mostrarTerminos && (
          <div className="terminos-contenido">
            <p><strong>Última actualización:</strong> 15 de octubre de 2025</p>
            <p><strong>1. Aceptación de los Términos:</strong> Al acceder y participar en este foro, aceptas cumplir estos Términos y Condiciones. Si no estás de acuerdo, no uses el foro.</p>
            <p><strong>2. Uso del Foro:</strong> El foro es un espacio anónimo y seguro para compartir experiencias relacionadas con salud mental. Debes usar el foro de manera respetuosa y responsable, evitando lenguaje ofensivo, discriminatorio o ilegal. No se permite compartir información personal de terceros sin su consentimiento.</p>
            <p><strong>3. Privacidad y Datos Personales:</strong> Todos los mensajes pueden ser anónimos. No se recopilan datos personales sin tu consentimiento explícito. La información compartida en el foro no se divulga fuera de la plataforma.</p>
            <p><strong>4. Moderación:</strong> El foro cuenta con moderadores que pueden editar, eliminar o bloquear mensajes que infrinjan estos términos. Los usuarios que incumplan las normas pueden ser suspendidos o eliminados del foro.</p>
            <p><strong>5. Responsabilidad:</strong> El foro no reemplaza atención profesional. La información compartida es únicamente con fines de apoyo mutuo. No nos responsabilizamos por decisiones tomadas basadas en el contenido del foro.</p>
            <p><strong>6. Propiedad Intelectual:</strong> El contenido generado por el foro y sus usuarios queda protegido por derechos de autor. No se permite reproducir o distribuir material fuera de la plataforma sin autorización.</p>
            <p><strong>7. Cambios en los Términos:</strong> Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios se notificarán en la plataforma y entrarán en vigor inmediatamente después de su publicación.</p>
          </div>
        )}

        <button type="submit" disabled={!isFormValid}>
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default CrearCuenta;
