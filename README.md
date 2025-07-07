
## 🔧 Setup

1. Clone this repo
2. Run `npm install`
3. Add environment values in `cypress.env.json`
4. Use `npx cypress open` or `npx cypress run`

## 🧪 Test Types

| Suite     | Purpose                         |
|-----------|----------------------------------|
| Nightly   | Full regression tests            |
| PR        | Smoke checks on pull requests    |
| Release   | Pre-release sanity + blockers    |

## 🚀 Run Examples

```bash
# Run Nightly Team A tests
npx cypress run --spec "cypress/e2e/Nightly/team-a/*.cy.js"

## 👤 Author

**TimurDN**  
🌐 [GitHub](https://github.com/TimurDN)  
💼 QA Engineer | Passionate about test architecture
