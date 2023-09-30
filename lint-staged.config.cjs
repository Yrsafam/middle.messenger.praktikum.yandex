module.exports = {
  "*.ts": [() => "tsc --noEmit", "npm run lint:eslint", () => "npm run test"],
  "*.scss": ["npm run lint:styles"],
};
