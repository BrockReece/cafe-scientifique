export default function (context) {
  return {
    httpEndpoint: 'https://graphql.datocms.com',
    getAuth: () => `bearer ${process.env.DATO_CMS_TOKEN}`
  }
}
