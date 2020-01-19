export default function (context) {
  return {
    httpEndpoint: 'https://graphql.datocms.com',
    getAuth: () => `bearer ${context.env.DATO_CMS_TOKEN}`
  }
}
