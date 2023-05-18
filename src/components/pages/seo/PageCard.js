import { Button, Heading, Stack, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { updateSeoById } from "../../../api/seo";

function PageCard(props) {
  const { data } = props
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleUpdate = async () => {
    try {
      setLoading(true)
      let body = {
        title: title,
        metaDescription: description,
        pageName: name,
      }
      console.log( body)
      const res = await updateSeoById(data._id, body)
      if (res.status === 200) {
        toast({
          title: 'Updated Successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        setLoading(false)
      }
    } catch (err) {
      console.log(err)
      setLoading(false)
      toast({
        title: 'Something went wrong',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
    finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    setName(data.pageName);
    setTitle(data.title);
    setDescription(data.metaDescription);
  }, [])

  return (
    <Stack
      my={5}
      bg="white"
      boxShadow="md" borderRadius="md"
      p={["4", "6"]} spacing={["4", "6"]}
      onClick={handleUpdate}>
      <Heading fontSize={["xl", "2xl"]}>{props.name}</Heading>
      <Stack justify="space-around"
        direction={["column", "column", "row"]}
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Page Name"
        />
        <input
          type="text"
          placeholder="Page Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Page Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          variant="outline"
          colorScheme="blue"
          px={["4", "6"]}
          isLoading={loading}
          onClick={() => handleUpdate(data._id)}
          loadingText="Updating"
        >
          Update
        </Button>
      </Stack>
    </Stack>
  );
}

export default PageCard;
