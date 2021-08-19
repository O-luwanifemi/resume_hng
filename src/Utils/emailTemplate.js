export const emailTemplate = async (email, message) => {
  const HTML = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Mail from website guest</title>
      </head>

      <body>
        <article>
          <ul>
            <li>
              <section>
                <em>Sender: ${email}</em>
              </section>
            </li>

            <li>
              <section>
                <strong>Message:</strong>
                <p>${message}</p>
              </section>
            </li>
          </ul>
        </article>

        <br />
        <hr />

        <footer>
          <p style="text-align: center; color: red;">NB: Click "reply" to respond to sender's mail</p>
        </footer>
      </body>
    </html>
  `;

  return HTML;
}