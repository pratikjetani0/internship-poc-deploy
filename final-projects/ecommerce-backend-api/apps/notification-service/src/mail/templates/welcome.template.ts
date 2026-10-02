import { baseTemplate } from './base.template';

export function welcomeTemplate(name: string) {
  return baseTemplate(
    'Welcome 🎉',

    `
      <p>Hello ${name},</p>

      <p>
        Thank you for joining our platform.
      </p>

      <p>
        Happy Shopping!
      </p>
    `,
  );
}
