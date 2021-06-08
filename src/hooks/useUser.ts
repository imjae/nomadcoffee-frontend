import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logUserIn, logUserOut } from "../apollo";

const ME_QUERY = gql`
  query me {
    me {
      username
      avater
    }
  }
`;

const useUser = () => {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data, error } = useQuery(ME_QUERY, {
    skip: !hasToken,
  });

  useEffect(() => {
    if (data?.me === null) {
      logUserOut();
    }
  }, []);

  console.log(data, error);

  return;
};

export default useUser;
