export default function (context) {
  console.log(process.env)
  return {
    httpEndpoint: 'https://graphql.datocms.com',
    getAuth: () => `bearer ${process.env.DATO_CMS_TOKEN}`
  }
}
