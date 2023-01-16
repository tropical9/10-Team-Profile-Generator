const createHTML = (teamMembers) => {
    let html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Team Profile</title>
    </head>
    <body>
        <header>
            <h1>Team Profile</h1>
        </header>
        <main>
            <section>`;
    teamMembers.forEach((member) => {
        html += `
                <div>
                    <h2>${member.name}</h2>
                    <p>ID: ${member.id}</p>
                    <p>Email: ${member.email}</p>`;
        if (member.officeNumber) {
            html += `<p>Office Number: ${member.officeNumber}</p>`;
        }
        if (member.github) {
            html += `<p>GitHub: <a href="https://github.com/${member.github}">${member.github}</a></p>`;
        }
        if (member.school) {
            html += `<p>School: ${member.school}</p>`;
        }
        html += `</div>`;
    });
    html += `
            </section>
        </main>
    </body>
    </html>`;
    return html;
};
module.exports = createHTML;
