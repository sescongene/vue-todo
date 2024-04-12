export default gql`
  mutation CreateTodo($title: String!) {
    createTodo(title: $title) {
      id
      title
      status
    }
  }
`;
