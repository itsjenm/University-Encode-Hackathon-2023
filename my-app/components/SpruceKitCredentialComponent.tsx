import { SSX } from "@spruceid/ssx";
import { useEffect, useState } from "react";
import { toCredentialEntry } from "@/utils/rebase";
import {
  Box,
  Heading,
  Table,
  Tbody,
  Tr,
  Td,
  Button,
  Text,
  Code,
  Container,
} from "@chakra-ui/react";

interface ICredentialComponent {
  ssx: SSX;
}

const SpruceKitCredentialComponent = ({ ssx }: ICredentialComponent) => {
  const [credentialsList, setCredentialsList] = useState<string[]>([]);
  const [viewingContent, setViewingContent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleGetContent = async (content: string) => {
    setLoading(true);
    try {
      const contentName = content.replace("my-app/", "");
      const { data } = await ssx.credentials.get(contentName);
      setViewingContent(
        `${content}:\n${JSON.stringify(toCredentialEntry(data), null, 2)}`
      );
   
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    const getCredentialList = async () => {
      try {
        const credentialListResult = await ssx.credentials?.list?.({
          removePrefix: true,
        });
        if (credentialListResult?.data) {
          setCredentialsList(credentialListResult.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getCredentialList();
  }, [ssx]);

  return (
    <Box marginTop={2} display="flex" flexDirection="column" >
      <Heading as="h2" size="md" >
        SpruceKit Credentials
      </Heading>
      <Table display="flex" justifyContent="center">
        
        <Tbody>
          {credentialsList?.map((credential, i) => (
            <Tr key={i}>
              <Td>{credential}</Td>
              <Td>
                <Button
                  onClick={() => handleGetContent(credential)}
                  disabled={loading}
                >
                  GET
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Container display="flex" marginTop={25} flexWrap="wrap" width="20px" justifyContent="center" textAlign="center">
        <Code width="lg">{viewingContent}</Code>
      </Container>
    </Box>
  );
};

export default SpruceKitCredentialComponent;
