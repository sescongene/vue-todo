export default gql`
  query Todos {
    todos {
      data {
        id
        title
        status
      }
    }
  }
`;
