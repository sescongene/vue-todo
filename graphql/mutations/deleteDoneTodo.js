export default gql`
  mutation DeleteDoneTodo {
    deleteDoneTodo {
      id
      title
      status
      created_at
      updated_at
    }
  }
`;
