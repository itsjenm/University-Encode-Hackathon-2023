"use client";
import { SSX } from "@spruceid/ssx";
import { useEffect, useState } from "react";
import { Button, Input, Textarea, Table, Tbody, Tr, Td, Box, } from "@chakra-ui/react";

interface IKeplerStorageComponent {
  ssx: SSX;
}

const KeplerStorageComponent = ({ ssx }: IKeplerStorageComponent) => {
  const [key, setKey] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [letter, setletter] = useState<string>("");
  const [contentList, setContentList] = useState<Array<string>>([]);
  const [viewingContent, setViewingContent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getContentList();
  }, []);


  const getContentList = async () => {
    setLoading(true);
    let { data } = await ssx.storage.list();
    data = data.filter((d: string) => d.includes("/content/"));
    setContentList(data);
    setLoading(false);
  };

  const handlePostContent = async (
    key: string,
    value: string,
    letter: string
  ) => {
    if (!key || !value || !letter) {
      alert("Invalid inputs");
      return;
    }
    const formatedKey = "content/" + key.replace(/\ /g, "_");
    setLoading(true);
    await ssx.storage.put(formatedKey, letter);
    setContentList((prevList) => [...prevList, `my-app/${formatedKey}`]);
    setKey("");
    setValue("");
    setletter("");
    setLoading(false);
  };

  const handleGetContent = async (content: string) => {
    setLoading(true);
    const contentName = content.replace("my-app/", "");
    const { data } = await ssx.storage.get(contentName);
    setViewingContent(data.split("\n"));
    setLoading(false);
  };

  const handleDeleteContent = async (content: string) => {
    setLoading(true);
    const contentName = content.replace("my-app/", "");
    await ssx.storage.delete(contentName);
    setContentList((prevList) => prevList.filter((c) => c !== content));
    setLoading(false);
  };

  return (
    <div style={{ marginTop: 50, display: "flex", justifyContent: "center" }}>
      <div style={{ textAlign: "center", maxWidth: 500, margin: "20px" }}>
        <h1>Storage Module</h1>
        <h3>Store your letters and notes in Kepler Orbit</h3>

        <div>
          <Input
            width="lg"
            type="text"
            placeholder="Title"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            disabled={loading}
            margin="10px"
          />
          <Input
            width="lg"
            type="text"
            placeholder="From"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={loading}
            margin="10px"
          />
          <br />
          <Textarea
            width="lg"
            height="sm"
            placeholder="Paste Letter"
            value={letter}
            onChange={(e) => setletter(e.target.value)}
            disabled={loading}
            margin="10px"
          />
          <br />
          <Button
            onClick={() => handlePostContent(key, value, letter)}
            disabled={loading}
            style={{ marginTop: 15 }}
          >
            <span>POST</span>
          </Button>
        </div>
        <p>
          <b>My Data Vault</b>
        </p>
        <Table>
          <Tbody>
            {contentList?.map((content, i) => (
              <Tr key={i}>
                <Td>{content}</Td>
                <Td>
                  <Button
                    onClick={() => handleGetContent(content)}
                    disabled={loading}
                  >
                    <span>GET</span>
                  </Button>
                </Td>
                <Td>
                  <Button
                    onClick={() => handleDeleteContent(content)}
                    disabled={loading}
                  >
                    <span>DELETE</span>
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Box style={{ marginTop: "25px", marginBottom: "0"}}>
          <Box
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          > 
            {viewingContent?.map((line, i) => (
              <Box key={i}>{line}</Box>
            ))}
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default KeplerStorageComponent;
