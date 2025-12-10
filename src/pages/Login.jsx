import React from 'react';
import { useForm } from 'react-hook-form';
import "../styles/login.css";



const IniciarSesion = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log('Datos de inicio de sesión:', data);
    alert('✅ Inicio de sesión exitoso (simulado)');
  };

  return (
    <div id="iniciarsesion" className="iniciarsesion-container">
      <h1 className="iniciarsesion-title">Iniciar Sesión</h1>
      <form className="iniciarsesion-form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Correo electrónico</label>
        <input
          type="email"
          id="email"
          {...register('email', { required: 'Este campo es obligatorio' })}
          placeholder="ejemplo@correo.com"
        />
        {errors.email && <span className="error">{errors.email.message}</span>}

        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          {...register('password', { required: 'Este campo es obligatorio' })}
          placeholder="Ingresa tu contraseña"
        />
        {errors.password && <span className="error">{errors.password.message}</span>}

        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default IniciarSesion;