const createHTML = (teamMembers) => {
    let html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Team Profile</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" type="text/css" href="./style.css">

    
    </head>
    <body>
        <header>
            <h1 class ="team-heading"> Team Profile </h1>
        </header>
        <main>
            <section class="team-area">`;
    teamMembers.forEach((member) => {
        html += `
                <div class="card-body">
                    <h2 class ="employee-card">${member.name}</h2>
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