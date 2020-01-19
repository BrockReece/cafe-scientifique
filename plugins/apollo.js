export default function (context) {
  console.log(context.env)
  return {
    httpEndpoint: 'https://graphql.datocms.com',
    getAuth: () => `bearer ${context.env.DATO_CMS_TOKEN}`
  }
}
