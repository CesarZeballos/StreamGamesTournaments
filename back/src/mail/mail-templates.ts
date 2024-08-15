import { Subject } from 'rxjs';

const BASE_URL =
	'https://stream-games-tournaments-git-main-cesarzeballos-projects.vercel.app/';
const LOGO_URL =
	'https://res.cloudinary.com/dofwlsemg/image/upload/v1723488558/sin_fondo_mkqskb.png';
const HEADER_COLOR = '#261039';
const TEXT_COLOR = '#bbbbbb';

const commonStyles = {
	container: `
    background: linear-gradient(135deg, #261039 10%, #e45affce 60%, #261039 90%);
    font-family: Roboto, sans-serif;
    border: 5px solid #be286e;
    text-align: center;
    padding: 20px;
  `,
	logo: `
    width: 230px;
    margin: 20px;
  `,
	header: `
    font-size: 36px;
    color: ${TEXT_COLOR};
    margin: 0 0 20px;
  `,
	paragraph: `
    font-size: 20px;
    letter-spacing: 1.5px;
    color: ${TEXT_COLOR};
    padding: 0 40px;
    padding-bottom: 15px;
  `,
	button: `
    display: inline-block;
    background-color: ${HEADER_COLOR};
    color: ${TEXT_COLOR};
    padding: 15px 30px;
    font-size: 18px;
    text-decoration: none;
    border-radius: 30px;
  `,
	footer: `
    font-size: 14px;
    color: ${TEXT_COLOR};
    margin-top: 40px;
  `,
	image: `
    width: 90%;
    max-width: 1200px;
    height: auto;
    border: 2px solid #e35aff;
    padding: 8px;
    margin: auto;
  `,
	icon: `
    width: 50px;
    height: auto;
    color: ${TEXT_COLOR};
  `,
};

export const MailTemplates = {
	welcomeEmail: (email: string, name: string) => ({
		to: email,
		subject: 'Welcome to our platform!',
		text: `Hi ${name},\n\nGracias por registrarte en nuestra plataforma. Estamos emocionados de tenerte con nosotros.\n\nSaludos,\nEl equipo de la plataforma`,
		html: `
      <div style="${commonStyles.container}">
        <img src="${LOGO_URL}" alt="Logo" style="${commonStyles.logo}" />
        <h1 style="${commonStyles.header}">Hi ${name}!</h1>
        <h2 style="font-size: 24px; color: ${HEADER_COLOR}; margin: 0 0 20px">Welcome to Stream Games Tournaments!</h2>
        <p style="${commonStyles.paragraph}">
          Welcome to the Ultimate Tournament Platform!<br />
          You're about to embark on an epic journey where your skills will be tested, and legends are born. Get ready to level up and dominate the competition. Whether you're a seasoned pro or just starting out, there's a place for you to shine.<br />
          The action starts now—brace yourself for the thrill of victory and the glory that awaits!
        </p>
        <div style="padding: 10px">
          <img src="https://res.cloudinary.com/dofwlsemg/image/upload/v1723487721/por-qu%C3%A9-compa%C3%B1%C3%ADas-videojuegos-son-blanco-atractivo-cibercriminales_yf8aql.jpg" alt="Portada" style="${commonStyles.image}" />
        </div>
        <div style="font-size: 24px">
          <p style="color: ${TEXT_COLOR}">Are you ready for battle?</p>
        </div>
        <a href="${BASE_URL}" style="${commonStyles.button}">READY! GO!</a>
        <div style="color: ${TEXT_COLOR}; text-align: center; margin-top: 30px; display: flex; justify-content: space-evenly;">
          <div style="margin: 20px">
            <img src="https://res.cloudinary.com/dofwlsemg/image/upload/v1723489451/compromiso-de-los-empleados_di8vvf.png" alt="Delivery" style="${commonStyles.icon}" />
            <p>Dedication</p>
          </div>
          <div style="margin: 20px">
            <img src="https://res.cloudinary.com/dofwlsemg/image/upload/v1723489452/seguro-de-calidad_cdpvd2.png" alt="Quality" style="${commonStyles.icon}" />
            <p>Quality</p>
          </div>
          <div style="margin: 20px">
            <img src="https://res.cloudinary.com/dofwlsemg/image/upload/v1723489451/informacion-personal_bg2hno.png" alt="Guarantee" style="${commonStyles.icon}" />
            <p>Guarantee</p>
          </div>
        </div>
        <p style="${commonStyles.footer}">Terms of Service | Privacy Policy | Website</p>
      </div>`,
	}),

	tournamentCreated: (
		email: string,
		name: string,
		tournamentName: string,
	) => ({
		to: email,
		subject: 'Tournament Created Successfully!',
		text: `Hi ${name},\n\nThe tournament named "${tournamentName}" has been created successfully. Good luck!\n\nBest regards,\nThe Platform Team`,
		html: `
      <div style="${commonStyles.container}">
        <img src="${LOGO_URL}" alt="Logo" style="${commonStyles.logo}" />
        <h1 style="${commonStyles.header}">Tournament Created Successfully!</h1>
        <p style="${commonStyles.paragraph}">
          Hi ${name},<br />
          The tournament named <strong>"${tournamentName}"</strong> has been created successfully. Good luck!<br />
          If you have any questions or need assistance, feel free to contact us.
        </p>
        <a href="${BASE_URL}" style="${commonStyles.button}">VISIT PLATFORM</a>
        <p style="${commonStyles.footer}">Terms of Service | Privacy Policy | Website</p>
      </div>`,
	}),
	registeredTeam: (
		organizerEmail: string,
		organizerName: string,
		tournamentName: string,
		teamName: string,
	) => ({
		to: organizerEmail,
		subject: 'Registration Successful!',
		text: `Hi ${organizerName},\n\nYou have successfully registered the team ${teamName} in the tournament ${tournamentName}. Good luck!\n\nBest regards,\nStream Games Tournaments`,
		html: `
      <div style="${commonStyles.container}">
        <img src="${LOGO_URL}" alt="Logo" style="${commonStyles.logo}" />
        <h1 style="${commonStyles.header}">Registration Successful!</h1>
        <p style="${commonStyles.paragraph}">
          Hi ${organizerName},<br />
          You have successfully registered the team <strong>${teamName}</strong> in the tournament <strong>${tournamentName}</strong>. Good luck in your matches!<br />
          If you have any questions or need assistance, feel free to contact us.
        </p>
        <a href="${BASE_URL}" style="${commonStyles.button}">VISIT PLATFORM</a>
        <p style="${commonStyles.footer}">Terms of Service | Privacy Policy | Website</p>
      </div>`,
	}),

	registeredUser: (
		userEmail: string,
		userName: string,
		tournamentName: string,
		teamName: string,
		organizerName: string,
	) => ({
		to: userEmail,
		subject: 'Registration Successful!',
		text: `Hi ${userName},\n\nYou have successfully registered for the tournament ${tournamentName} organized by ${organizerName} and team ${teamName}.\n\nBest regards,\nStream Games Tournaments`,
		html: `
      <div style="${commonStyles.container}">
        <img src="${LOGO_URL}" alt="Logo" style="${commonStyles.logo}" />
        <h1 style="${commonStyles.header}">Registration Successful!</h1>
        <p style="${commonStyles.paragraph}">
          Hi ${userName},<br />
          You have successfully registered for the tournament <strong>"${tournamentName}"</strong> organized by <strong>${organizerName}</strong> and team <strong>${teamName}</strong>.<br />
          If you have any questions or need assistance, feel free to contact us.
        </p>
        <a href="${BASE_URL}" style="${commonStyles.button}">VISIT PLATFORM</a>
        <p style="${commonStyles.footer}">Terms of Service | Privacy Policy | Website</p>
      </div>`,
	}),
};
