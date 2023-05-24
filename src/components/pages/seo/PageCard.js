import { Button, Heading, Stack, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { updateSeoById } from "../../../api/seo";
import { useRouter } from "next/router";

function PageCard(props) {
  const router = useRouter()
  const { data } = props
  const toast = useToast();
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      let body = {
        title: title,
        metaDescription: description,
        pageName: name,
      }
      console.log(body)
      const res = await updateSeoById(data._id, body)
      if (res.status === 200) {
        toast({
          title: 'Updated Successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        setLoading(false)
        router.push('/seo')
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
      my={4}
      bg="white"
      boxShadow="md" borderRadius="md"
      p={["2"]} spacing={["4", "6"]}>
      <Heading fontSize={['sm','md', "xl"]}>{data.pageName}</Heading>
      <form onSubmit={handleUpdate}>
        <Stack justify="space-around"
          direction={["column", "column", "row"]}
        >
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="pagename"
          />
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Page Title"
            name="title"
          />
          <input
            value={description}
            onChange={e => setDescription(e.target.value)}
            type="text"
            placeholder="Page Description"
            name="description"
          />
          <Button
            type="submit"
            variant="outline"
            colorScheme="blue"
            px={["4", "6"]}
            isLoading={loading}
            loadingText="Updating"
          >
            Update
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}

export default PageCard;
