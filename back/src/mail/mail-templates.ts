export const MailTemplates = {
	welcomeEmail: (email: string, name: string) => ({
		to: email,
		subject: '¡Bienvenido a nuestra plataforma!',
		text: `Hola ${name},\n\nGracias por registrarte en nuestra plataforma. Estamos emocionados de tenerte con nosotros.\n\nSaludos,\nEl equipo de la plataforma`,
		html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h1 style="color: #007BFF;">¡Bienvenido, ${name}!</h1>
          <p>Gracias por registrarte en nuestra plataforma. Estamos emocionados de tenerte con nosotros.</p>
          <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.</p>
          <p>Saludos,<br>El equipo de la plataforma</p>
        </div>
      `,
	}),

	tournamentCreated: (
		email: string,
		name: string,
		tournamentName: string,
	) => ({
		to: email,
		subject: '¡Torneo creado exitosamente!',
		text: `Hola ${name},\n\nEl torneo con el nombre "${tournamentName}" ha sido creado exitosamente. ¡Buena suerte!\n\nSaludos,\nEl equipo de la plataforma`,
		html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h1 style="color: #28a745;">¡Torneo creado exitosamente!</h1>
          <p>Hola ${name},</p>
          <p>El torneo con el nombre <strong>"${tournamentName}"</strong> ha sido creado exitosamente. ¡Buena suerte!</p>
          <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.</p>
          <p>Saludos,<br>El equipo de la plataforma</p>
        </div>
      `,
	}),
};
