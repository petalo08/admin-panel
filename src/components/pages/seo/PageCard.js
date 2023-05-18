import { Button, Heading, Stack, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { updateSeoById } from "../../../api/seo";

function PageCard(props) {
  const { key, data } = props
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleUpdate = async (id) => {
    try {
      setLoading(true)
      let body = {
        title: title,
        metaDescription: description,
        pageName: name,
      }
      const res = await updateSeoById(id, body)
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
  }, [props]);

  return (
    <Stack
      my={5}
      bg="white"
      boxShadow="md"
      borderRadius="md"
      p={["4", "6"]}
      spacing={["4", "6"]}
      onClick={handleUpdate}
    >
      <Heading fontSize={["xl", "2xl"]}>{props.name}</Heading>
      <form onSubmit={handleUpdate}>
        <Stack direction="row" justify="space-around">
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
            type="submit"
            px={["4", "6"]}
          >
            Update
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}

export default PageCard;
