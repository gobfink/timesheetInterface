main.workflow:

workflow "Pull Request" {
  on = "pull_request"
  resolves = [ESLint]
}

action "ESLint" {
  uses = "jinjubei/eslint-action@master"
  secrets = ${{secrets.GITHUB_TOKEN}}
}