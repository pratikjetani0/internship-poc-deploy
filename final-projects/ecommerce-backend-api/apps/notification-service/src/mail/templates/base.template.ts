export function baseTemplate(title: string, content: string) {
  return `
  <!DOCTYPE html>
  <html>
    <body
      style="
        margin:0;
        padding:0;
        background:#f4f7fb;
        font-family:Arial,sans-serif;
      "
    >
      <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
      >
        <tr>
          <td align="center">

            <table
              width="650"
              cellpadding="0"
              cellspacing="0"
              style="
                background:#ffffff;
                margin:30px auto;
                border-radius:12px;
                overflow:hidden;
                box-shadow:0 4px 20px rgba(0,0,0,0.08);
              "
            >

              <tr>
                <td
                  style="
                    background:#2563eb;
                    padding:24px;
                    text-align:center;
                  "
                >
                  <h1
                    style="
                      color:white;
                      margin:0;
                    "
                  >
                    E-Commerce Platform
                  </h1>
                </td>
              </tr>

              <tr>
                <td
                  style="
                    padding:32px;
                  "
                >
                  <h2
                    style="
                      margin-top:0;
                      color:#111827;
                    "
                  >
                    ${title}
                  </h2>

                  ${content}
                </td>
              </tr>

              <tr>
                <td
                  style="
                    background:#f9fafb;
                    padding:20px;
                    text-align:center;
                    color:#6b7280;
                    font-size:13px;
                  "
                >
                  © 2026 E-Commerce Platform

                  <br />

                  Thank you for choosing us.
                </td>
              </tr>

            </table>

          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
}
