// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  flightResultJsonUrl: '/Tas.Web/ETS/SearchForServices/tas-angular/Angular/assets/flight-result.json',
  AirlineCodeToCityNameUrl: '/Tas.Web/ETS/SearchForServices/tas-angular/Angular/assets/airport-to-city.json',
  AirlineNameListUrl: '/Tas.Web/ETS/SearchForServices/tas-angular/Angular/assets/airline-names.json',
  CurrencyConvertListUrl: '/Tas.Web/ETS/SearchForServices/tas-angular/Angular/assets/currency.json',

  AirlinesLogoPath: '/Tas.Web/ETS/SearchForServices/tas-angular/Angular/assets/airlines-logos/'
};
