import { Subject } from 'rxjs';

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

	registeredTeam: (
		organizerEmail: string,
		organizerName: string,
		tournamentName: string,
		teamName: string,
	) => ({
		to: organizerEmail,
		subject: '¡Registro exitoso!',
		text: `Hola ${organizerName},\n\nHaz registrado exitosamente el equipo ${teamName} en el torneo ${tournamentName}. ¡Buena suerte!.\n\nSaludos,\nStream Games Tournamets`,
		html: `
        <div>
          <h1>¡Registro al torneo exitoso!</h1>
          <p>Hola ${organizerName},</p>
          <p>El registro al torneo <strong>"${tournamentName}"</strong> del equipo ${teamName} ha sido exitoso. ¡Buena suerte en tu combate!</p>
          <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.</p>
          <p>Saludos,<br>Stream Games Tournamets</p>
        </div>
      `,
	}),

	registeredUser: (
		userEmail: string,
		userName: string,
		tournamentName: string,
		teamName: string,
		organizerName: string,
	) => ({
		to: userEmail,
		subject: '¡Registro exitoso!',
		text: `Hola ${userName},\n\nTe has registrado exitosamente en el torneo ${tournamentName} organizado por ${organizerName} y el equipo ${teamName}.\n\nSaludos,\nStream Games Tournamets`,
		html: `
        <div>
          <h1>¡Registro al torneo exitoso!</h1>
          <p>Hola ${userName},</p>
          <p>El registro al torneo <strong>"${tournamentName}"</strong> del equipo ${teamName} por parte de ${organizerName} ha sido exitoso. ¡Buena suerte en tu combate!</p>
          <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.</p>
          <p>Saludos,<br>Stream Games Tournamets</p>
        </div>
      `,
	}),
};
