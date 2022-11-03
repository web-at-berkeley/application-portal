import { Center } from "@chakra-ui/react";

import Application from "../../components/application-form/Application";

interface ParamsProp {
  params: {
    id: string;
  };
}

export default function ApplicationPage({ params }: ParamsProp) {
  return (
    <Center>
      <Application id={params.id} />
    </Center>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }: ParamsProp) {
  return {
    props: {
      params,
    },
  };
}
